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
import { DropdownModule } from 'primeng/dropdown';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ListboxModule } from 'primeng/listbox';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
// import { ClientContactsComponent } from '../client-contacts/client-contacts.component';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { ShareModule } from '../share/share.module';
@NgModule({
  declarations: [
    ClientTableComponent,
    // ClientContactsComponent
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
    InputTextModule,ButtonModule,FileUploadModule,
    DropdownModule,
    SplitButtonModule,
    ListboxModule,
    OverlayPanelModule,
    MenuModule,
    MenubarModule,
    DynamicDialogModule,
    ShareModule
  ],
  providers: [DialogService]
})
export class ClientTableModule { }
