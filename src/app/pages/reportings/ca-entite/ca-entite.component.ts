import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTable, MatTableDataSource, MatPaginator  } from '@angular/material';
import { AppSettings } from '../../../app.settings';
import { Settings } from '../../../app.settings.model';
import { Capital } from '../reportings.model';
import { Observable } from 'rxjs/Rx';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import {MatDialog} from '@angular/material';
import { ReportingsService } from '../reportings.service';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ControlesService } from '../../controles/list-controle/controles.service';
import {LoginComponent} from '../../login/login.component';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-ca-entite',
  templateUrl: './ca-entite.component.html'
})
export class CapitalEntiteComponent implements OnInit {
  @ViewChild('table', { read: ElementRef }) table: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  isSavingError = false;
  isSubmitted = false;
  editing = {};
  rows = [];
  temp = [];
  month = [];
  selected = [];
  selectedDomaine = [];
  loadingIndicator: boolean = true;
  reorderable: boolean = true;
  public form: FormGroup;
  entites: any[];
  annees: any[];
  domaines: any[];
  capital: Capital;
  columns = [
    { prop: 'id' },
    { name: 'ca_golbal' },
    { name: 'entite' },
    { name: 'domaine' },
    { name: 'annee' },
    { name: 'mois' }
  ];
  public settings: Settings;

  constructor(public appSettings: AppSettings, public http: HttpClient, public dialog: MatDialog,
              public controlesService: ControlesService, public reportingsService: ReportingsService,
              public router: Router, public fb: FormBuilder, private toastr: ToastrService, translateService: TranslateService) {
    this.settings = this.appSettings.settings;
    this.form = this.fb.group({
      id: null,
      entite: this.fb.group({
        id: null,
        libelle: null,
      }),
      domaine: this.fb.group({
        id: null,
        libelle: null,
      }),
      annee: null
    });

    translateService.setDefaultLang('fr');
    translateService.setDefaultLang(LoginComponent.translation ? LoginComponent.translation.currentLang : 'fr');

    this.getListeCapital().subscribe(data => {
      this.temp = [...data];
      this.rows = data;
      this.month = [
        'Janvier',
        'Février',
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
    this.reportingsService.selectedCapital = null;
    this.reportingsService.getListEntites().subscribe(data => this.entites = data);
    this.reportingsService.getListAnneesExercice().subscribe(data => this.annees = data);
    this.controlesService.getListDomaines().subscribe(data => this.domaines = data);
  }

  fetch(data) {
    const req = new XMLHttpRequest();
    req.open('GET', 'assets/data/company.json');
    req.onload = () => {
      data(JSON.parse(req.response));
    };
    req.send();
  }

  getListeCapital(): Observable<Capital[]> {
    return this.http.get<Capital[]>(this.appSettings.rootUrl + 'api/les_capitals');
  }

  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
    this.selectedDomaine.splice(0, this.selectedDomaine.length);
    this.selectedDomaine.push(...this.selectedDomaine);
  }

  onActivate(event) {
  }

  public setCA(type) { this.reportingsService.typeCA = type; }

  public saisir(capital) {
    this.reportingsService.typeCA = 'domaine';
    this.reportingsService.selectedCapital = capital;
    this.router.navigateByUrl('/reportings/saisie-ca-entite');
  }

  public search_ca(entite, domaine, an): void {
    this.isSubmitted = true;
    this.reportingsService.getCapitalsEntiteDomaine(entite, domaine, an).subscribe(
      (data: Capital[]) => {
        this.rows = data;
        this.isSubmitted = false;
      },
      (err: HttpErrorResponse) => { this.isSubmitted = false; }
    );
  }

  exportAsExcel() {
    const date = new Date();
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement, { raw: true });
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'ca-entite-domaine-' + date + '.xlsx');
  }
}
