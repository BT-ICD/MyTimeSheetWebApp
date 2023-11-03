import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamMemberComponent } from './team-member.component';

const routes: Routes = [
  {path: '', component : TeamMemberComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamMemberRoutingModule { }
