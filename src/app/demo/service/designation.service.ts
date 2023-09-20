import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Idesignation } from '../api/idesignation';
@Injectable({
  providedIn: 'root'
})
export class DesignationService {

  private designations! : Idesignation[];

  constructor(private http : HttpClient) {}

  GetDesignation() : Observable<Idesignation[]>
  { 
    if(this.designations)
    {
      return of(this.designations);
    }

     return this.http.get<Idesignation[]>("https://localhost:7054/api/Designation/GetAll").pipe(
      tap(data => {this.designations = data}),
      catchError(this.HandleError)
     );
  }
  private HandleError(err : HttpErrorResponse)
  {
    let errorMessaage = '';
    if(err.error instanceof ErrorEvent){
      errorMessaage = `An error occurred: ${err.error.message}`;
    }
    else{
      errorMessaage = `Server returned code ${err.status}, error message is : ${err.message}`;
    }
    console.error('==>', errorMessaage);
    return throwError(()=>errorMessaage);
  }

  GetDesignationById(id : number) : Observable<Idesignation>
  {
    if(this.designations)
    {
      console.log(this.designations)
    }
    const url = 'https://localhost:7054/api/Designation/GetById/'
    return this.http.get<Idesignation>(`${url}${id}`).pipe(
    tap(data => console.log('Data' + JSON.stringify(data))),
    catchError(this.HandleError)
 )
  }
  
  InsertDesignation(designation : Idesignation) : Observable<Idesignation>
  {
    return this.http.post<Idesignation>("https://localhost:7054/api/Designation/Add", designation).pipe(
      tap(data => this.SaveData(data, true)),
      catchError(this.HandleError)
    );
  }

  UpdateDesignation(desgination : Idesignation) : Observable<Idesignation>
  {
    return this.http.put<Idesignation>("https://localhost:7054/api/Designation/Edit", desgination).pipe(
      tap(data => {this.SaveData(desgination)}),
      catchError(this.HandleError)
    );
  }

  SaveData(designation : Idesignation, add : boolean = false)
  {
    if(add)
    {
      this.designations.push(designation);
    }
    else
    {
      const index = this.designations.findIndex(item => item.designationId === designation.designationId);
      if (index !== -1) {
      this.designations[index] = designation;
    }
    }
  }

  DeleteDesignation(desgination : number) : Observable<Idesignation>
  {
    return this.http.delete<Idesignation>(`https://localhost:7054/api/Designation/Delete/${desgination}`);

  }
}
