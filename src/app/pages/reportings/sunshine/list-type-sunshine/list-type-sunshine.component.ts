import { Component, ViewChild, OnInit } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { AppSettings } from '../../../../app.settings';
import { Settings } from '../../../../app.settings.model';
import { TypeSunshine } from '../../reportings.model';
import {Observable} from 'rxjs/Rx';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import {MatDialog} from '@angular/material';
import { ReportingsService } from '../../reportings.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-type-sunshine',
  templateUrl: './list-type-sunshine.component.html'
})
export class ListTypeSunshineComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent;
  editing = {};
  rows = [];
  temp = [];
  month = [];
  selected = [];
  loadingIndicator: boolean = true;
  reorderable: boolean = true;
  typeSunshine: TypeSunshine;
  public settings: Settings;
  columns = [
    { prop: 'id' },
    { name: 'code' },
    { name: 'libelle' },
    { name: 'description' }
  ];

  constructor(public appSettings: AppSettings, public http: HttpClient, public dialog: MatDialog,
              public reportingsService: ReportingsService, public router: Router) {
    this.settings = this.appSettings.settings;

    this.getListeTypeSunshines().subscribe(data => {
      this.temp = [...data];
      this.rows = data;
      setTimeout(() => { this.loadingIndicator = false; }, 1500);
    });
  }

  ngOnInit() {
    this.reportingsService.selectedTypeSunshine = null;
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

  getListeTypeSunshines(): Observable<TypeSunshine[]> {
    return this.http.get<TypeSunshine[]>(this.appSettings.rootUrl + 'api/types_sunshines');
  }

  onSelect({ selected }) {
    console.log('Select Event', selected, this.selected);
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onActivate(event) {
  }

  public saisirTypeSunshine(typeSunshine) {
    this.reportingsService.selectedTypeSunshine = typeSunshine;
    this.router.navigateByUrl('/reportings/saisie-type-sunshine');
  }
}
