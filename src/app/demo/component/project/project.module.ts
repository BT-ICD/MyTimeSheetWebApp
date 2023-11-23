import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectComponent } from './project.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ListboxModule } from 'primeng/listbox';
import { PanelModule } from 'primeng/panel';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ShareModule } from '../share/share.module';
import { DialogModule } from 'primeng/dialog';
import { InputMaskModule } from 'primeng/inputmask';

@NgModule({
  declarations: [
    ProjectComponent
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    FileUploadModule,
    DropdownModule,
    SplitButtonModule,
    ListboxModule,
    PanelModule,
    OverlayPanelModule,
    ShareModule,
    DialogModule,
    InputMaskModule
  ]
})
export class ProjectModule { }
