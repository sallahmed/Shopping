import { Component, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { AppSettings } from '../../../../app.settings';
import { Settings } from '../../../../app.settings.model';
import {Suivi} from '../../list-controle/controle.model';
import {Observable} from 'rxjs/Rx';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import {MatDialog} from '@angular/material';
import { ControlesService } from '../../list-controle/controles.service';
import { Router } from '@angular/router';
import {LoginComponent} from '../../../login/login.component';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-list-suivi',
  templateUrl: './list-suivi.component.html'
})
export class ListSuiviComponent {
  @ViewChild(DatatableComponent) table: DatatableComponent;
  editing = {};
  rows = [];
  temp = [];
  selected = [];
  loadingIndicator: boolean = true;
  reorderable: boolean = true;
  suivi: Suivi;
  columns = [
    { prop: 'id' },
    { name: 'controle' },
    { name: 'type' },
    { name: 'periode' },
    { name: 'date' }
  ];
  public settings: Settings;

  constructor(public appSettings:AppSettings, public http: HttpClient, public dialog: MatDialog,
              public controleService: ControlesService, public router: Router, private translateService: TranslateService) {
    this.settings = this.appSettings.settings;

      this.getListeSuivis().subscribe(data => {
        this.temp = [...data];
        this.rows = data;
        setTimeout(() => { this.loadingIndicator = false; }, 1500);
      });

    translateService.setDefaultLang('fr');
    translateService.setDefaultLang(LoginComponent.translation ? LoginComponent.translation.currentLang : 'fr');
  }

  ngOnInit() {
    this.controleService.selectedSuivi = null;
  }

  fetch(data) {
    const req = new XMLHttpRequest();
    req.open('GET', 'assets/data/company.json');
    req.onload = () => {
      data(JSON.parse(req.response));
    };
    req.send();
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(function(d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows = temp;
    this.table.offset = 0;
  }

  getListeSuivis(): Observable<Suivi[]> {
    return this.http.get<Suivi[]>(this.appSettings.rootUrl + 'api/les_suivis');
  }

    onSelect({ selected }) {
      console.log('Select Event', selected, this.selected);
      this.selected.splice(0, this.selected.length);
      this.selected.push(...selected);
    }

    onActivate(event) {
      //console.log('Activate Event', event);
    }

  public saisir(suivi) {
      this.controleService.selectedSuivi = suivi;
      this.router.navigateByUrl('/controles/saisie-suivi');
  }
}