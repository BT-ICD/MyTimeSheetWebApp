import { Component, ElementRef, ViewChild } from '@angular/core';
import { LayoutService } from '../service/layout.service';
import { MenuItem } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Router } from '@angular/router';
@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent {
  items!: MenuItem[];

  @ViewChild('menubutton') menuButton!: ElementRef;

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

  @ViewChild('topbarmenu') menu!: ElementRef;
  
  @ViewChild('overlayPanel') overlayPanel!: OverlayPanel;

  constructor(public layoutService: LayoutService, private router : Router) { }

 
  logout()
  {
    this.router.navigate(['/login']);
  }

}
