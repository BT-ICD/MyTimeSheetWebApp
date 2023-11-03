import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap, throwError } from 'rxjs';
import { IteamMember } from '../api/iteam-member';

@Injectable({
  providedIn: 'root'
})
export class TeamMemberService {

  private teamMembers! : IteamMember[];

  constructor(private http : HttpClient) { }

  getAllTeamMember() : Observable<IteamMember[]>
  {
    if(this.teamMembers)
    {
      return of(this.teamMembers);
    }

     return this.http.get<IteamMember[]>("https://localhost:7054/api/TeamMember/GetAllTeamMember").pipe(
      tap(data => {this.teamMembers = data}),
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

  getTeamMemberById(id : number) : Observable<IteamMember>
  {
    if(this.teamMembers)
    {
      console.log(this.teamMembers)
    }
    const url = 'https://localhost:7054/api/TeamMember/GetTeamMemberById/'
    return this.http.get<IteamMember>(`${url}${id}`).pipe(
    tap(data => console.log('Data' + JSON.stringify(data))),
    catchError(this.HandleError)
    )
  }

  InsertTeamMember(teamMember : IteamMember, designationName : string) : Observable<IteamMember>
  {
    debugger
    return this.http.post<IteamMember>(`https://localhost:7054/api/TeamMember/InsertTeamMember/${designationName}`, teamMember).pipe(
      tap(data => this.SaveData(data, true)),
      catchError(this.HandleError)
    );
  }

  UpdateTeamMember(teamMember : IteamMember) : Observable<IteamMember>
  {
    return this.http.put<IteamMember>("https://localhost:7054/api/TeamMember/UpdateTeamMember", teamMember).pipe(
      tap(data => {this.SaveData(teamMember)}),
      catchError(this.HandleError)
    );
  }

  SaveData(teamMember : IteamMember, add : boolean = false)
  {
    if(add)
    {
      this.teamMembers.push(teamMember);
    }
    else
    {
      const index = this.teamMembers.findIndex(item => item.teamMemberId === teamMember.teamMemberId);
      if (index !== -1) {
      this.teamMembers[index] = teamMember;
    }
    }
  }

  DeleteTeamMember(teamMember : number) : Observable<IteamMember>
  {
    return this.http.delete<IteamMember>(`https://localhost:7054/api/TeamMember/Delete/${teamMember}`);

  }
}
