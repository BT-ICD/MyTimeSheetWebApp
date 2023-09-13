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
                
                  { label: 'Table', icon: 'pi pi-fw pi-table', routerLink: ['/uikit/table'] },
                  { label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/list'] },
                  
                
              ]
          },
        
      ];
  }

}
