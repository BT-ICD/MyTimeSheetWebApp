import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskTypeRoutingModule } from './task-type-routing.module';
import { TaskTypeComponent } from './task-type.component';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { FileUploadModule } from 'primeng/fileupload';
import { ShareModule } from '../share/share.module';

@NgModule({
  declarations: [
    TaskTypeComponent
  ],
  imports: [
    CommonModule,
    TaskTypeRoutingModule,
    PanelModule,
    DialogModule,
    FormsModule,ReactiveFormsModule ,TableModule,InputTextModule,ButtonModule,ToastModule,FileUploadModule,
    ShareModule
  ]
})
export class TaskTypeModule { }
