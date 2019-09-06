import { Component, OnInit, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AppSettings } from '../../../../app.settings';
import { Settings } from '../../../../app.settings.model';
import { MenuService } from '../menu.service';
import { MatMenuTrigger } from '@angular/material';

@Component({
  selector: 'app-porteur-menu',
  templateUrl: './porteur-menu.component.html',
  styleUrls: ['./porteur-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ MenuService ]
})
export class PorteurMenuComponent implements OnInit {
  @Input('menuParentId') menuParentId;
  public menuItems:Array<any>;
  public settings: Settings;
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  constructor(public appSettings:AppSettings, public menuService:MenuService, public router:Router) { 
    this.settings = this.appSettings.settings;
  }

  ngOnInit() {
    this.menuItems = this.menuService.getPorteurMenuItems();
    this.menuItems = this.menuItems.filter(item => item.parentId == this.menuParentId);
  }

  ngAfterViewInit(){
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if(this.settings.fixedHeader){
          let mainContent = document.getElementById('main-content');
          if(mainContent){
            mainContent.scrollTop = 0;
          }
        }
        else{
          document.getElementsByClassName('mat-drawer-content')[0].scrollTop = 0;
        }
      }                
    });
  } 

}