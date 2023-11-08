import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap, throwError } from 'rxjs';
import { Iproject } from '../api/iproject';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {


  private projects! : Iproject[];

  constructor(private http : HttpClient) {}


  getAllProject() : Observable<Iproject[]>
  { 
    debugger;
    if(this.projects)
    {
      return of(this.projects);
    }

     return this.http.get<Iproject[]>("https://localhost:7054/api/Project/GetAllProject").pipe(
      tap(data => {this.projects = data}),
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

  getProjectById(id : number) : Observable<Iproject>
  {
    if(this.projects)
    {
      console.log(this.projects)
    }
    const url = ''
    return this.http.get<Iproject>(`${url}${id}`).pipe(
    tap(data => console.log('Data' + JSON.stringify(data))),
    catchError(this.HandleError)
 )
  }
  
  InsertProject(project : Iproject) : Observable<Iproject>
  {
    return this.http.post<Iproject>("https://localhost:7054/api/Project/InsertProject", project).pipe(
      tap(data => this.SaveData(data, true)),
      catchError(this.HandleError)
    );
  }

  UpdateProject(project : Iproject) : Observable<Iproject>
  {
    return this.http.put<Iproject>("", project).pipe(
      tap(data => {this.SaveData(project)}),
      catchError(this.HandleError)
    );
  }

  SaveData(project : Iproject, add : boolean = false)
  {
    if(add)
    {
      this.projects.push(project);
    }
    else
    {
      const index = this.projects.findIndex(item => item.projectId === project.projectId);
      if (index !== -1) {
      this.projects[index] = project;
    }
    }
  }

  DeleteProject(project : number) : Observable<Iproject>
  {
    return this.http.delete<Iproject>(`/${project}`);

  }
}
