import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import {TranslateService} from '@ngx-translate/core';
import { LoginComponent } from '../../../pages/login/login.component';

import { Menu } from './menu.model';
import { superAdminMenuItems, horizontalMenuItems, adminMenuItems, porteurMenuItems} from './menu';

@Injectable()
export class MenuService {

  constructor(private location:Location, private router: Router, private translate: TranslateService){}

  public getSuperAdminMenuItems():Array<Menu> {
    // return superAdminMenuItems;
      return  [
          new Menu (1, LoginComponent.translation ? LoginComponent.translation.instant('menu.tdb') : 'Tableau', '/dashboard', null, 'dashboard', null, false, 0),
          new Menu (2, LoginComponent.translation ? LoginComponent.translation.instant('menu.usr') : 'Utilisateurs', '/users', null, 'supervisor_account', null, false, 0),
          new Menu (10, LoginComponent.translation ? LoginComponent.translation.instant('menu.config') : 'Paramètres', null, null, 'dvr', null, true, 0),
          new Menu (11, LoginComponent.translation ? LoginComponent.translation.instant('menu.ctrl') : 'Contrôles', '/parametres/controles', null, 'short_text', null, false, 10),
          new Menu (12, LoginComponent.translation ? LoginComponent.translation.instant('menu.ent') : 'Entité', '/parametres/entites', null, 'check_box', null, false, 10),
          new Menu (13, LoginComponent.translation ? LoginComponent.translation.instant('menu.struct') : 'Type structure', '/parametres/types-structures', null, 'today', null, false, 10),
          new Menu (14, LoginComponent.translation ? LoginComponent.translation.instant('menu.act') : 'Activité', '/parametres/activites', null, 'view_stream', null, false, 10),
          new Menu (15, LoginComponent.translation ? LoginComponent.translation.instant('menu.period') : 'Périodicité', '/parametres/periodicites', null, 'input', null, false, 10),
          new Menu (16, LoginComponent.translation ? LoginComponent.translation.instant('menu.traf') : 'Type trafic', '/parametres/types-trafics', null, 'radio_button_checked', null, false, 10),
          new Menu (17, LoginComponent.translation ? LoginComponent.translation.instant('menu.method') : 'Méthode de contrôle', '/parametres/methodes-controles', null, 'playlist_add_check', null, false, 10),
          new Menu (18, LoginComponent.translation ? LoginComponent.translation.instant('menu.typectrl') : 'Type de contrôle', '/parametres/types-controles', null, 'tune', null, false, 10),
          new Menu (19, LoginComponent.translation ? LoginComponent.translation.instant('menu.flux') : 'Flux', '/parametres/flux', null, 'tune', null, false, 10),
          new Menu (20, LoginComponent.translation ? LoginComponent.translation.instant('menu.domain') : 'Domaine', '/parametres/domaine', null, 'view_column', null, false, 10),
          new Menu (30, LoginComponent.translation ? LoginComponent.translation.instant('menu.ctrl') : 'Contrôles', null, null, 'view_module', null, true, 0),
          new Menu (31, LoginComponent.translation ? LoginComponent.translation.instant('menu.lstctrl') : 'Liste des contrôles', '/controles/list-controle', null, 'view_column', null, false, 30),
          new Menu (32, LoginComponent.translation ? LoginComponent.translation.instant('menu.dysf') : 'Dysfonctionnement', '/controles/dysfonctionnements', null, 'last_page', null, false, 30),
          new Menu (40, LoginComponent.translation ? LoginComponent.translation.instant('menu.suivis') : 'Suivis', '/controles/list-suivis', null, 'label', null, false, 0),
          new Menu (60, LoginComponent.translation ? LoginComponent.translation.instant('menu.report') : 'Reportings', null, null, 'multiline_chart', null, true, 0),
          new Menu (61, LoginComponent.translation ? LoginComponent.translation.instant('menu.comp') : 'Reporting compliance', '/reportings/compliance', null, 'insert_chart', null, false, 60),
          new Menu (62, LoginComponent.translation ? LoginComponent.translation.instant('menu.finance') : 'Reporting  financier', '/reportings/financier', null, 'pie_chart', null, false, 60),
          new Menu (63, LoginComponent.translation ? LoginComponent.translation.instant('menu.synth') : 'Reporting synthèse', '/reportings/synthese', null, 'show_chart', null, false, 60),
          new Menu (64, LoginComponent.translation ? LoginComponent.translation.instant('menu.suninit') : 'Sunshines initiatives', '/reportings/list-sunshine', null, 'pie_chart', null, false, 60),
          new Menu (65, LoginComponent.translation ? LoginComponent.translation.instant('menu.tpsun') : 'Type sunshines', '/reportings/list-type-sunshine', null, 'pie_chart', null, false, 60),
          new Menu (50, LoginComponent.translation ? LoginComponent.translation.instant('menu.ca') : 'CA', '/reportings/ca-entite', null, 'computer', null, false, 0),
      ]
    
  }

  public getHorizontalMenuItems():Array<Menu> {
    // return horizontalMenuItems;
      return [
          new Menu (1, LoginComponent.translation ? LoginComponent.translation.instant('menu.tdb') : 'Tableau', '/dashboard', null, 'dashboard', null, false, 0),
          new Menu (30, LoginComponent.translation ? LoginComponent.translation.instant('menu.ctrl') : 'Contrôles', null, null, 'view_module', null, true, 0),
          new Menu (31, LoginComponent.translation ? LoginComponent.translation.instant('menu.lstctrl') : 'Liste des contrôles', '/controles/list-controle', null, 'view_column', null, false, 30),
          new Menu (32, LoginComponent.translation ? LoginComponent.translation.instant('menu.dysf') : 'Dysfonctionnement', '/controles/dysfonctionnements', null, 'last_page', null, false, 30),
          new Menu (33, LoginComponent.translation ? LoginComponent.translation.instant('menu.evalmatur') : 'Evaluation maturité', '/controles/evaluation-maturite', null, 'view_module', null, false, 30),
          new Menu (40, LoginComponent.translation ? LoginComponent.translation.instant('menu.suivis') : 'Suivis', '/controles/list-suivis', null, 'label', null, false, 0),
          new Menu (70, LoginComponent.translation ? LoginComponent.translation.instant('menu.report') : 'Reportings', null, null, 'multiline_chart', null, true, 0),
          new Menu (71, LoginComponent.translation ? LoginComponent.translation.instant('menu.comp') : 'Reporting compliance', '/reportings/compliance', null, 'insert_chart', null, false, 70),
          new Menu (72, LoginComponent.translation ? LoginComponent.translation.instant('menu.finance') : 'Reporting  financier', '/reportings/financier', null, 'pie_chart', null, false, 70),
          new Menu (73, LoginComponent.translation ? LoginComponent.translation.instant('menu.synth') : 'Reporting synthèse', '/reportings/synthese', null, 'show_chart', null, false, 70),
          new Menu (72, LoginComponent.translation ? LoginComponent.translation.instant('menu.suninit') : 'Sunshines initiatives', '/reportings/list-sunshine', null, 'pie_chart', null, false, 70),
          new Menu (72, LoginComponent.translation ? LoginComponent.translation.instant('menu.tpsun') : 'Type sunshines', '/reportings/list-type-sunshine', null, 'pie_chart', null, false, 70),
          new Menu (50, LoginComponent.translation ? LoginComponent.translation.instant('menu.ca') : 'CA', '/reportings/ca-entite', null, 'computer', null, false, 0),
      ]
  }

  public getAdminMenuItems():Array<Menu> {
        // return adminMenuItems;
      return [
          new Menu (1,  LoginComponent.translation ? LoginComponent.translation.instant('menu.tdb') : 'Tableau', '/dashboard', null, 'dashboard', null, false, 0),
          new Menu (2, LoginComponent.translation ? LoginComponent.translation.instant('menu.usr') : 'Utilisateurs', '/users', null, 'supervisor_account', null, false, 0),
          new Menu (10, LoginComponent.translation ? LoginComponent.translation.instant('menu.config') : 'Paramètres', null, null, 'dvr', null, true, 0),
          new Menu (11, LoginComponent.translation ? LoginComponent.translation.instant('menu.ent') : 'Entité', '/parametres/entites', null, 'check_box', null, false, 10),
          new Menu (12, LoginComponent.translation ? LoginComponent.translation.instant('menu.act') : 'Activité', '/parametres/activites', null, 'view_stream', null, false, 10),
          new Menu (13, LoginComponent.translation ? LoginComponent.translation.instant('menu.traf') : 'Type trafic', '/parametres/types-trafics', null, 'radio_button_checked', null, false, 10),
          new Menu (14, LoginComponent.translation ? LoginComponent.translation.instant('menu.method') : 'Méthode de contrôle', '/parametres/methodes-controles', null, 'playlist_add_check', null, false, 10),
          new Menu (15, LoginComponent.translation ? LoginComponent.translation.instant('menu.typectrl') : 'Type de contrôle', '/parametres/types-controles', null, 'tune', null, false, 10),
          new Menu (16, LoginComponent.translation ? LoginComponent.translation.instant('menu.flux') : 'Flux', '/parametres/flux', null, 'tune', null, false, 10),
          new Menu (27, LoginComponent.translation ? LoginComponent.translation.instant('menu.domain') : 'Domaine', '/parametres/domaine', null, 'view_column', null, false, 10),
          new Menu (18, LoginComponent.translation ? LoginComponent.translation.instant('menu.ctrl') : 'Contrôles', '/parametres/controles', null, 'star_half', null, false, 10),
          new Menu (30, LoginComponent.translation ? LoginComponent.translation.instant('menu.ctrl') : 'Contrôles', null, null, 'view_module', null, true, 0),
          new Menu (31, LoginComponent.translation ? LoginComponent.translation.instant('menu.lstctrl') : 'Liste des contrôles', '/controles/list-controle', null, 'view_column', null, false, 30),
          new Menu (32, LoginComponent.translation ? LoginComponent.translation.instant('menu.dysf') : 'Dysfonctionnement', '/controles/dysfonctionnements', null, 'last_page', null, false, 30),
          new Menu (33, LoginComponent.translation ? LoginComponent.translation.instant('menu.evalmatur') : 'Evaluation maturité', '/controles/evaluation-maturite', null, 'view_module', null, false, 30),
          new Menu (40, LoginComponent.translation ? LoginComponent.translation.instant('menu.suivis') : 'Suivis', '/controles/list-suivis', null, 'label', null, false, 0),
          new Menu (60, LoginComponent.translation ? LoginComponent.translation.instant('menu.report') : 'Reportings', null, null, 'multiline_chart', null, true, 0),
          new Menu (61, LoginComponent.translation ? LoginComponent.translation.instant('menu.comp') : 'Reporting compliance', '/reportings/compliance', null, 'insert_chart', null, false, 60),
          new Menu (62, LoginComponent.translation ? LoginComponent.translation.instant('menu.finance') : 'Reporting  financier', '/reportings/financier', null, 'pie_chart', null, false, 60),
          new Menu (63, LoginComponent.translation ? LoginComponent.translation.instant('menu.synth') : 'Reporting synthèse', '/reportings/synthese', null, 'show_chart', null, false, 60),
          new Menu (64, LoginComponent.translation ? LoginComponent.translation.instant('menu.suninit') : 'Sunshines initiatives', '/reportings/list-sunshine', null, 'pie_chart', null, false, 60),
          new Menu (65, LoginComponent.translation ? LoginComponent.translation.instant('menu.tpsun') : 'Type sunshines', '/reportings/list-type-sunshine', null, 'pie_chart', null, false, 60),
          new Menu (50, LoginComponent.translation ? LoginComponent.translation.instant('menu.ca') : 'CA', '/reportings/ca-entite', null, 'computer', null, false, 0),
      ]
  }

  public getPorteurMenuItems():Array<Menu> {
        // return porteurMenuItems;
      return [
          new Menu (1, LoginComponent.translation ? LoginComponent.translation.instant('menu.tdb') : 'Tableau', '/dashboard', null, 'dashboard', null, false, 0),
          new Menu (10, LoginComponent.translation ? LoginComponent.translation.instant('menu.ctrl') : 'Contrôles', null, null, 'view_module', null, true, 0),
          new Menu (11, LoginComponent.translation ? LoginComponent.translation.instant('menu.lstctrl') : 'Liste des contrôles', '/controles/mes-controles', null, 'view_column', null, false, 10),
          new Menu (12, LoginComponent.translation ? LoginComponent.translation.instant('menu.dysf') : 'Dysfonctionnement', '/controles/dysfonctionnements', null, 'last_page', null, false, 10),
          new Menu (20, LoginComponent.translation ? LoginComponent.translation.instant('menu.suivis') : 'Suivis', '/controles/list-suivis', null, 'label', null, false, 0),
          new Menu (30, LoginComponent.translation ? LoginComponent.translation.instant('menu.report') : 'Reportings', null, null, 'multiline_chart', null, true, 0),
          new Menu (31, LoginComponent.translation ? LoginComponent.translation.instant('menu.comp') : 'Reporting compliance', '/reportings/compliance-porteur', null, 'insert_chart', null, false, 30),
          new Menu (32, LoginComponent.translation ? LoginComponent.translation.instant('menu.finance') : 'Reporting  financier', '/reportings/financier', null, 'pie_chart', null, false, 30),
      ]
  }

  public expandActiveSubMenu(menu:Array<Menu>){
      let url = this.location.path();
      let routerLink = url; // url.substring(1, url.length);
      let activeMenuItem = menu.filter(item => item.routerLink === routerLink);
      if(activeMenuItem[0]){
        let menuItem = activeMenuItem[0];
        while (menuItem.parentId != 0){  
          let parentMenuItem = menu.filter(item => item.id == menuItem.parentId)[0];
          menuItem = parentMenuItem;
          this.toggleMenuItem(menuItem.id);
        }
      }
  }

  public toggleMenuItem(menuId){
    let menuItem = document.getElementById('menu-item-'+menuId);
    let subMenu = document.getElementById('sub-menu-'+menuId);  
    if(subMenu){
      if(subMenu.classList.contains('show')){
        subMenu.classList.remove('show');
        menuItem.classList.remove('expanded');
      }
      else{
        subMenu.classList.add('show');
        menuItem.classList.add('expanded');
      }      
    }
  }

  public closeOtherSubMenus(menu:Array<Menu>, menuId){
    let currentMenuItem = menu.filter(item => item.id == menuId)[0]; 
    if(currentMenuItem.parentId == 0 && !currentMenuItem.target){
      menu.forEach(item => {
        if(item.id != menuId){
          let subMenu = document.getElementById('sub-menu-'+item.id);
          let menuItem = document.getElementById('menu-item-'+item.id);
          if(subMenu){
            if(subMenu.classList.contains('show')){
              subMenu.classList.remove('show');
              menuItem.classList.remove('expanded');
            }              
          } 
        }
      });
    }
  }
  

}
