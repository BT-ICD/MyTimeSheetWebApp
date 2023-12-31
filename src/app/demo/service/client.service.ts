import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Iclient } from '../api/iclient';
import { BehaviorSubject, Observable, Subscription, catchError, of, tap, throwError } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private clients! : Iclient[];
  private clientIdSubject = new BehaviorSubject<number | null>(null);

  constructor(private http : HttpClient) { }

  setClientId(clientId: number) {
    this.clientIdSubject.next(clientId);
  }

  getClientId() {
    return this.clientIdSubject.asObservable();
  }
  
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

  // getClientLookUp(): Observable<Iclient[]>
  // {
  //   return this.http.get<Iclient[]>("https://localhost:7054/api/Client/GetClientLookup/lookup").pipe(
  //     catchError(this.HandleError)
  //   )
  // }

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

  // fetchClients() 
  // {
  //    this.http.get<Iclient[]>("https://localhost:7054/api/Client/GetAllClient").subscribe((clients) => {
  //     this.clientsSubject.next(clients);
  //   });
  // }

  SaveData(client : Iclient, add : boolean = false)
  {
    if(add)
    {
      this.clients.push(client);
      // this.fetchClients();
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
