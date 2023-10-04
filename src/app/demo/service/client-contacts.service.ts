import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IclientContacts } from '../api/iclient-contacts';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientContactsService {

  private clientContacts! : IclientContacts[]
  private apiUrl = 'https://localhost:7054/api/ClientContact/GetAllClientContact';

  constructor(private http : HttpClient) { }
  
  getClientContact() : Observable<IclientContacts[]>
  {
    if(this.clientContacts)
    {
      return of(this.clientContacts);
    }
    return this.http.get<IclientContacts[]>("https://localhost:7054/api/ClientContact/GetAllClientContact").pipe(
      tap(data=> {this.clientContacts = data 
      console.log(this.clientContacts)}),
        catchError(this.HandleError)
    );
  }
  getClientContactById(id : number) : Observable<IclientContacts>
  {
    if(this.clientContacts)
    {
      console.log(this.clientContacts)
    }
    const url = 'https://localhost:7054/api/ClientContact/GetClientContactById/'
    return this.http.get<IclientContacts>(`${url}${id}`).pipe(
    tap(data => console.log('Data' + JSON.stringify(data))),
    catchError(this.HandleError)
    )
  }

  // getClientContactsByClientId(clientId: number): Observable<IclientContacts[]> {
  //   return this.http.get<IclientContacts[]>(this.apiUrl).pipe(
  //     map((data: IclientContacts[]) => 
  //       this.clientContacts = data.filter(item => item.clientId === clientId)
  //     )
  //   );
  // }

  insertClientContact(clientContact : IclientContacts) : Observable<IclientContacts>
  {
    return this.http.post<IclientContacts>("https://localhost:7054/api/ClientContact/InsertClientContact",clientContact).pipe(
      catchError(this.HandleError)
    )  
  }

  updateClientContact(clientContact : IclientContacts) : Observable<IclientContacts>
  {
    return this.http.put<IclientContacts>("https://localhost:7054/api/ClientContact/UpdateClientContact",clientContact).pipe(
      catchError(this.HandleError)
    );
  }

  // SaveData(clientContact : IclientContacts, add : boolean = false)
  // {
  //   if(add)
  //   {
  //     this.clientContacts.push(clientContact);
  //     const filteredContacts = this.clientContacts.filter(item => item.clientId === clientContact.clientId);
  //     this.clientContacts = filteredContacts;
  //   }
  //   else
  //   {
  //     debugger
  //     const index = this.clientContacts.findIndex(item => item.contactId === clientContact.contactId);
  //     if (index !== -1) {
  //     this.clientContacts[index] = clientContact;
  //   }
  //   }
  // }

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
 
  DeleteClientContact(clientContact : number) : Observable<IclientContacts>
  {
    return this.http.delete<IclientContacts>(`https://localhost:7054/api/ClientContact/DeleteClientContact/${clientContact}`).pipe(catchError(this.HandleError));
  }

}
