import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Iclient } from '../api/iclient';
import { Observable, catchError, of, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private clients! : Iclient[];
  constructor(private http : HttpClient) { }

  GetAllClients(): Observable<Iclient[]>
  {
    if(this.clients)
    {
      return of(this.clients)
    }
    return this.http.get<Iclient[]>("https://localhost:7054/api/Client/GetAllClient").pipe(
      tap(data =>{this.clients = data}),
      catchError(this.HandleError)
    )
  }

  private HandleError(err :HttpErrorResponse)
  {
    let errorMessaage = "";
    if(err.error instanceof ErrorEvent)
    {
      errorMessaage = `An error occurred: ${err.error.message}`;
    }
    else{
      errorMessaage = `Server returned code ${err.status}, error message is : ${err.message}`;
    }
    console.error('==>', errorMessaage);
    return throwError(()=>errorMessaage);
  }

  GetClientById(id : number) : Observable<Iclient>
  {
    if(this.clients)
    {
      console.log(this.clients)
    }
    const url = 'https://localhost:7054/api/Client/GetByClientId/'
    return this.http.get<Iclient>(`${url}${id}`).pipe(
    tap(data => console.log('Data' + JSON.stringify(data))),
    catchError(this.HandleError)
    )
  }

  InsertClient(client : Iclient) : Observable<Iclient>
  {
    return this.http.post<Iclient>("https://localhost:7054/api/Client/InsertClient", client).pipe(
      tap(data => this.SaveData(data, true)),
      catchError(this.HandleError)
    );
  }

  UpdateClient(client : Iclient) : Observable<Iclient>
  {
    return this.http.put<Iclient>("https://localhost:7054/api/Client/UpdateClient", client).pipe(
      tap(data => {this.SaveData(client)}),
      catchError(this.HandleError)
    );
  }

  SaveData(client : Iclient, add : boolean = false)
  {
    if(add)
    {
      this.clients.push(client);
    }
    else
    {
      const index = this.clients.findIndex(item => item.clientId === client.clientId);
      if (index !== -1) {
      this.clients[index] = client;
    }
    }
  }

  DeleteCLient(client : number) : Observable<Iclient>
  {
    return this.http.delete<Iclient>(`https://localhost:7054/api/Client/DeleteClient/${client}`);
  }

}
