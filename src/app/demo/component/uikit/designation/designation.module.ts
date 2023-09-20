import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesignationRoutingModule } from './designation-routing.module';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DesignationComponent } from './designation.component';
import { ToastModule } from 'primeng/toast';
import { FileUploadModule } from 'primeng/fileupload';
@NgModule({
  declarations: [
    DesignationComponent
  ],
  imports: [
    CommonModule,
    DesignationRoutingModule,
    PanelModule,
    DialogModule,
    FormsModule,ReactiveFormsModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    FileUploadModule
  ]
})
export class DesignationModule { }
