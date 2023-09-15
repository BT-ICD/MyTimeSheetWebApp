import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: 'designationList', 
    data: { breadcrumb: 'Table1' },
    loadChildren: () => import('./designation/designation.module').then(m => m.DesignationModule) 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UikitRoutingModule { }
