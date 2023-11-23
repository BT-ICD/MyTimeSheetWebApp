import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { MenuitemComponent } from './menuitem/menuitem.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LayoutComponent } from './layout/layout.component';
import { TopbarComponent } from './topbar/topbar.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    MenuComponent,
    MenuitemComponent,
    SidebarComponent,
    LayoutComponent,
    TopbarComponent,
    
    
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    OverlayPanelModule,
    ButtonModule
  ]
})
export class LayoutModule { }
