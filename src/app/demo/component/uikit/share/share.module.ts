import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientContactsComponent } from '../client-contacts/client-contacts.component';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { CustomtoastComponent } from '../customtoast/customtoast.component';

@NgModule({
  declarations: [ClientContactsComponent, CustomtoastComponent],
  exports : [ClientContactsComponent, CustomtoastComponent],
  imports: [
    CommonModule,
    PanelModule,
    DialogModule,
    ReactiveFormsModule ,
    TableModule,
    InputTextModule,
    ButtonModule,ToastModule,FileUploadModule,DropdownModule,
    FormsModule
    
  ]
})
export class ShareModule { }
