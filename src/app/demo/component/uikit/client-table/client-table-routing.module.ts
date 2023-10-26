import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientTableComponent } from './client-table.component';
const routes: Routes = [
  {path : '', component : ClientTableComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientTableRoutingModule { }
