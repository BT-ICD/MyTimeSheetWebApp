import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: 'designationList', 
    data: { breadcrumb: 'Table1' },
    loadChildren: () => import('./designation/designation.module').then(m => m.DesignationModule) 
  },

  {
    path : 'clientList',
    data : {breadcrumb : 'Table'},
    loadChildren : () =>import('./client-table/client-table.module').then(m=> m.ClientTableModule)
  },
  {
    path : 'taskTypeList',
    data : {breadcrumb : 'Tbl'},
    loadChildren : () =>import('./task-type/task-type.module').then(m=> m.TaskTypeModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UikitRoutingModule { }
