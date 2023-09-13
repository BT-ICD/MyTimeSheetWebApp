import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { MenuitemComponent } from './menuitem/menuitem.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LayoutComponent } from './layout/layout.component';
import { TopbarComponent } from './topbar/topbar.component';



@NgModule({
  declarations: [
    MenuComponent,
    MenuitemComponent,
    SidebarComponent,
    LayoutComponent,
    TopbarComponent
  ],
  imports: [
    CommonModule
  ]
})
export class LayoutModule { }
