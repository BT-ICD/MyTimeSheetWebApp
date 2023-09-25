import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UikitRoutingModule } from './uikit-routing.module';
// import { DesignationComponent } from './designation/designation.component';
import { TableModule } from 'primeng/table';
// import { ClientTableComponent } from './client-table/client-table.component';

@NgModule({
  declarations: [
      ],
  imports: [
    CommonModule,
    UikitRoutingModule,
    TableModule

  ]
})
export class UikitModule { }
