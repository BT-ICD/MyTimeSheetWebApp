import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthLoginService {

  loggedIn: boolean = false;
  constructor() { }

  login(username: string, password: string): boolean {
    // Perform the login logic here
    if (username == 'admin@gmail.com' && password == '12345') {
      this.loggedIn = true;
      return true;
    }
    return false;
  }

  LogOut()
  {
    this.loggedIn = false;
  }
  isLoggedIn() {
    return this.loggedIn;
  }

}
