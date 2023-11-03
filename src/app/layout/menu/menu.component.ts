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
                  { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
              ]
          },
          {
              label: 'UI Components',
              items: [
                  { label: 'Designation List', icon: 'pi pi-fw pi-table', routerLink: ['/uikit/designationList'] }, 
                  {label : 'Client List', icon : 'pi pi-fw pi-table', routerLink : ['/uikit/clientList']},   
                  {label : 'TaskType List', icon : 'pi pi-fw pi-table', routerLink : ['/uikit/taskTypeList']},   
                  {label : 'Team Member List', icon : 'pi pi-fw pi-table', routerLink : ['/uikit/teamMemberList']}    
              ]
          },
        
      ];
  }

}
