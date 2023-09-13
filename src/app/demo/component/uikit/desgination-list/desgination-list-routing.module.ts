import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DesginationListComponent } from './desgination-list.component';

const routes: Routes = [
  {path : '', component: DesginationListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesginationListRoutingModule { }
