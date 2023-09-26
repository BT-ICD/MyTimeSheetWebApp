import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Itasktype } from '../api/itasktype';
import { Observable, catchError, of, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasktypeService {

  private taskTypes! : Itasktype[];
  constructor(private http : HttpClient) { }

  GetAllTaskType() : Observable<Itasktype[]>
  {
    if(this.taskTypes)
    {
      return of(this.taskTypes);
    }
    return this.http.get<Itasktype[]>('https://localhost:7054/api/TaskType/GetAllTaskType').pipe(
      tap(data => this.taskTypes = data),
      catchError(this.HandleError)
    );
  }

  private HandleError(err : HttpErrorResponse)
  {
    let errorMessaage = '';
    if(err.error instanceof ErrorEvent)
    {
      errorMessaage = `An error occurred: ${err.error.message}`;
    }
    else
    {
      errorMessaage = `Server returned code ${err.status}, error message is : ${err.message}`;
    }
    console.error('==>', errorMessaage);
    return throwError(()=>errorMessaage);
  }

  GetTaskTypeId(id : number) : Observable<Itasktype>
  {
    if(this.taskTypes)
    {
      console.log(this.taskTypes);
    }
    const url ='';
    return this.http.get<Itasktype>(`${url}${id}`).pipe(
      tap(data => console.log('Data' +JSON.stringify(data))),
      catchError(this.HandleError),
    );
  }

  InsertTaskType(taskType : Itasktype): Observable<Itasktype>
  {
    return this.http.post<Itasktype>('https://localhost:7054/api/TaskType/InsertTaskType',taskType).pipe(
      tap(data => this.SaveData(data, true)),
      catchError(this.HandleError)
    )
  }

  UpdateTaskType(taskType : Itasktype) : Observable<Itasktype>
  {
    return this.http.put<Itasktype>('https://localhost:7054/api/TaskType/UpdateTaskType', taskType).pipe(
      tap(data => this.SaveData(taskType)),
      catchError(this.HandleError)
    )
  }

  SaveData(taskType : Itasktype, add : boolean = false)
  {
    if(add)
    {
        this.taskTypes.push(taskType);
    } 
    else
    {
      const index = this.taskTypes.findIndex(item => item.id === taskType.id)
      if(index !== -1)
      {
        this.taskTypes[index] = taskType;
      }
    }
  }

  DeleteTaskType(id : number) : Observable<Itasktype>
  {
    return this.http.delete<Itasktype>(`https://localhost:7054/api/TaskType/DeleteTaskType/${id}`);
  }
}
