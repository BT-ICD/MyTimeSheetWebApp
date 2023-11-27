import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CustomtoastComponent } from '../../customtoast/customtoast.component';
import { AuthLoginService } from '../auth-login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
   providers : [MessageService]
})
export class LoginComponent  implements OnInit{

  mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  temp : boolean = false;
  loginForm!: FormGroup;
  @ViewChild(CustomtoastComponent) customToast!: CustomtoastComponent;

  constructor(private router : Router , private messageService: MessageService, private authLoginService : AuthLoginService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit()
  { 
    console.log(this.loginForm);

    if((this.loginForm.value.username).match(this.mailformat))
    {
      this.temp = this.authLoginService.login(this.loginForm.value.username, this.loginForm.value.password);
       if(this.temp)
       {
        this.router.navigate(['/layout']);
       }
      else
      {
        this.customToast.showUsernamePasswordToast();
      } 
    }
    else
    {
        this.customToast.showUsernameFormatToast();
    }
  }
}
