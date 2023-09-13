import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'list', data: { breadcrumb: 'List' }, loadChildren: () => import('./desgination-list/desgination-list-routing.module').then(m => m.DesginationListRoutingModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UikitRoutingModule { }
