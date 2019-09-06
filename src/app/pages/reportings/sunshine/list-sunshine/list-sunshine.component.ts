import { Component, ViewChild, OnInit } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { AppSettings } from '../../../../app.settings';
import { Settings } from '../../../../app.settings.model';
import { Sunshine } from '../../reportings.model';
import {Observable} from 'rxjs/Rx';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import {MatDialog} from '@angular/material';
import { ReportingsService } from '../../reportings.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-sunshine',
  templateUrl: './list-sunshine.component.html'
})
export class ListSunshineComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent;
  editing = {};
  rows = [];
  temp = [];
  month = [];
  selected = [];
  loadingIndicator: boolean = true;
  reorderable: boolean = true;
  sunshine: Sunshine;
  columns = [
    { prop: 'id' },
    { name: 'code' },
    { name: 'libelle' },
    { name: 'entite' },
    { name: 'mois' },
    { name: 'annee' },
    { name: 'valeur' },
    { name: 'date_debut' },
    { name: 'date_fin' },
    { name: 'date_saisi' },
    { name: 'last_modif' }
  ];
  public settings: Settings;

  constructor(public appSettings: AppSettings, public http: HttpClient, public dialog: MatDialog,
              public reportingsService: ReportingsService, public router: Router) {
    this.settings = this.appSettings.settings;

    this.getListeSunshines().subscribe(data => {
      this.temp = [...data];
      this.rows = data;
      this.month = [
        'Janvier',
        'Fevrier',
        'Mars',
        'Avril',
        'Mai',
        'Juin',
        'Juillet',
        'Août',
        'Septembre',
        'Octobre',
        'Novembre',
        'Décembre'
      ];
      setTimeout(() => { this.loadingIndicator = false; }, 1500);
    });
  }

  ngOnInit() {
    this.reportingsService.selectedSunshine = null;
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

  getListeSunshines(): Observable<Sunshine[]> {
    return this.http.get<Sunshine[]>(this.appSettings.rootUrl + 'api/les_sunshines');
  }

  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onActivate(event) {
  }

  public saisir(sunshine) {
    this.reportingsService.selectedSunshine = sunshine;
    this.router.navigateByUrl('/reportings/saisie-sunshine');
  }
}
