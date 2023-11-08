import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: 'designationList', 
    data: { breadcrumb: 'Table1' },
    loadChildren: () => import('../component/designation/designation.module').then(m => m.DesignationModule) 
  },

  {
    path : 'clientList',
    data : {breadcrumb : 'Table'},
    loadChildren : () =>import('../component/client-table/client-table.module').then(m=> m.ClientTableModule)
  },

  {
    path : 'taskTypeList',
    data : {breadcrumb : 'Tbl'},
    loadChildren : () =>import('../component/task-type/task-type.module').then(m=> m.TaskTypeModule)
  },

  {
    path : 'teamMemberList',
    data : {breadcrumb : 'Tbl'},
    loadChildren : () =>import('../component/team-member/team-member.module').then(m=> m.TeamMemberModule)
  },
  {
    path : 'projectList',
    data : {breadcrumb : 'Tbl'},
    loadChildren : () =>import('../component/project/project.module').then(m=> m.ProjectModule)
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentRoutingModule { }
