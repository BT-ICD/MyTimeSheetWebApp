import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientContactsRoutingModule } from './client-contacts-routing.module';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ListboxModule } from 'primeng/listbox';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';

@NgModule({
  imports: [
    CommonModule,
    ClientContactsRoutingModule,
    PanelModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    FileUploadModule,
    DropdownModule,
    DialogModule,
    TableModule,ReactiveFormsModule,
    FormsModule
  ]
})
export class ClientContactsModule { }
