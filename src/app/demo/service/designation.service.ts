import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap, throwError } from 'rxjs';
import { Idesignation } from 'src/app/idesignation';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DesignationService {

  private designation! : Idesignation[];

  constructor(private http : HttpClient) {}

  GetDesignation() : Observable<Idesignation[]>
  { 
    if(this.designation)
    {
      return of(this.designation);
    }

     return this.http.get<Idesignation[]>("http://192.168.1.11/timesheetapi/api/Designation/GetAll").pipe(
      tap(data => this.designation = data),
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
    const url = 'http://192.168.1.11/timesheetapi/api/Designation/GetById/'
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
      tap(data => this.SaveData(data)),
      catchError(this.HandleError)
    );
  }

  SaveData(designation : Idesignation, add : boolean = false)
  {
    if(add)
    {
      this.designation.push(designation);
    }
    else
    {
      this.designation = this.designation.map(data => data.designationId == designation.designationId ? designation : data);
    }
  }

  DeleteDesignation(desgination : number) : Observable<Idesignation[]>
  {
    return this.http.delete<Idesignation[]>(`https://localhost:7054/api/Designation/Delete/${desgination}`).pipe(
      catchError(this.HandleError)
    );
  }
}
