import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientTableRoutingModule } from './client-table-routing.module';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { FileUploadModule } from 'primeng/fileupload';
import { ClientTableComponent } from './client-table.component';

@NgModule({
  declarations: [
    ClientTableComponent
  ],
  imports: [
    CommonModule,
    ClientTableRoutingModule,
    PanelModule ,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    TableModule,
    InputTextModule,ButtonModule,FileUploadModule
  ]
})
export class ClientTableModule { }
