import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent  implements OnInit {

  model: any[] = [];

  constructor() { }

  ngOnInit() {
   
      this.model = [
          {
              label: 'Home',
              items: [
                  { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/layout'] }
              ]
          },
          {
              label: 'UI Components',
              items: [
                  { label: 'Designation List', icon: 'pi pi-fw pi-table', routerLink: ['/layout/component/designationList'] }, 
                  {label : 'Client List', icon : 'pi pi-fw pi-table', routerLink : ['/layout/component/clientList']},   
                  {label : 'TaskType List', icon : 'pi pi-fw pi-table', routerLink : ['/layout/component/taskTypeList']},   
                  {label : 'Team Member List', icon : 'pi pi-fw pi-table', routerLink : ['/layout/component/teamMemberList']} ,   
                  {label : 'Project List', icon : 'pi pi-fw pi-table', routerLink : ['/layout/component/projectList']}    
              ]
          },
        
      ];
  }

}
