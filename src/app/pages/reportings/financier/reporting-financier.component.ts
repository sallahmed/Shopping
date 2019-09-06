import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTable, MatTableDataSource, MatPaginator  } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppSettings } from '../../../app.settings';
import { Settings } from '../../../app.settings.model';
import { Observable } from 'rxjs/Rx';
import { ReportingsService } from '../reportings.service';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ChartDataModel } from '../chartData.model';
import * as XLSX from 'xlsx';
import { Reporting, Controles, Activites, PertesParEntite } from '../reportings.model';
import { Profil } from '../../../shared/profil.model';
import {LoginComponent} from '../../login/login.component';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-reporting-financier',
  templateUrl: './reporting-financier.component.html',
  styleUrls: ['./reporting-financier.component.scss']
})
export class ReportingFinancierComponent implements OnInit {
  @ViewChild('table', { read: ElementRef }) table: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  isSavingError = false;
  isSubmitted = false;
  lblMessage = '';
  entites: any[];
  annees: any[];
  capitals: any[];
  typeControles: any[];
  data: any[];
  controles: Array<Controles[]>;
  activites: Array<Activites[]>;
  loadingIndicator = true;
  selected: any[];
  public view_filter: any;
  public form: FormGroup;
  public pertes: any[];
  public sources_pertes: any[];
  public sources_pertes_ra: any[];
  public sources_pertes_fra: any[];
  public pertes_sauves: any[];
  public pour_ca_total: any[];
  public typologies_pertes: any[];
  public typologies_gains: any[];
  public single: any[];
  public multi: any[];
  public dataSource: any;
  public cpt = 0;
  public ngxData: any[];
  public simbox_lost: any[];
  public showXAxis = true;
  public showYAxis = true;
  public gradient = false;
  public showLegend = true;
  public tooltipDisabled = false;
  public legendTitle = 'Légende';
  public yAxisLabel = 'Revenus Sauves';
  public yAxisLabelCA = 'Pourcentage';
  public yAxisLabelTypo = 'Montants';
  public showYAxisLabel = true;
  public showXAxisLabel = true;
  public showRightYAxisLabel = true;
  public yAxisLabelRight = 'Pertes';
  public colorScheme = { domain: ['#ff7900', '#50be87'] };
  public showLabels = true;
  public explodeSlices = false;
  public doughnut = false;
  public autoScale = true;
  public chartType = 'combo-chart';
  public showGridLines = true;
  public view = [1000, 350];
  // tslint:disable-next-line:max-line-length
  public displayedColumns = ['janvier', 'fevrier', 'mars', 'avril', 'mai', 'juin', 'juillet', 'aout', 'septembre', 'octobre', 'novembre', 'decembre'];
  comboBarScheme = {
    name: 'singleLightBlue',
    selectable: true,
    group: 'Ordinal',
    domain: ['#ff7900']
  };
  lineChartScheme = {
    name: 'coolthree',
    selectable: true,
    group: 'Ordinal',
    // tslint:disable-next-line:max-line-length
    domain: ['#50be87', '#ff7900', '#2F3E9E', '#6CB6F7', '#378D3B', '#0096A6', '#F47B00']
  };
  public taux_pertes: any[] = [{'name': 'Pertes', 'series': []}];
  public taux_sauves: any[];
  public settings: Settings;

  constructor(public appSettings: AppSettings, public router: Router, private toastr: ToastrService,
              public fb: FormBuilder, public reportingService: ReportingsService, private translateService: TranslateService) {
    this.settings = this.appSettings.settings;
    this.form = this.fb.group({
      id: null,
      entite: this.fb.group({
        id: null,
        libelle: null,
      }),
      annee: null
    });
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser.profil.code === 'ANIMATEUR' || currentUser.profil.code === 'ADMIN' || currentUser.profil.code === 'SUPER_ADMIN') {
      this.view_filter = true;
    } else {
      this.view_filter = false;
    }
    const currentTime = new Date();
    const year = currentTime.getFullYear();
    this.reportingService.getPertesParEntite(year).subscribe((pertes: PertesParEntite[]) => {
      this.pertes = pertes['pertes'];
      this.sources_pertes = pertes['sources_pertes'];
      this.sources_pertes_ra = pertes['sources_pertes_ra'];
      this.sources_pertes_fra = pertes['sources_pertes_fra'];
    });
    this.reportingService.getPertesSauvesParEntite(null, year).subscribe((pertes_sauves: any[]) => {
      this.taux_sauves = [];
      this.pertes_sauves = pertes_sauves;
      pertes_sauves.forEach((value: any, key: any) => {
        this.taux_sauves.push({'name': this.displayedColumns[key], 'value': value[0].value_sauves});
        this.taux_pertes[0].series.push({'name': this.displayedColumns[key], 'value': value[0].value_pertes});
      });
    });
    this.reportingService.getReportingsFinancierGroupe(year).subscribe((data: Reporting[]) => {
      this.dataSource = new MatTableDataSource<Reporting>(data);
      this.typologies_pertes = [];
      this.typologies_gains = [];
      this.data = data;
      data.forEach((value: any, key: any) => {
        this.pour_ca_total = [
          { 'name': 'Total Pertes', 'value': value.moy_pour_loss },
          { 'name': 'Total Sauvés', 'value': value.moy_pour_save }
        ];
        const controles = value.controles;
        controles.forEach((val: any) => {
          this.typologies_pertes.push({'name': val.label_loss_tc, 'value': val.loss_tc_annuel});
          this.typologies_gains.push({'name': val.label_save_tc, 'value': val.save_tc_annuel});
        });
      });
      setTimeout(() => { this.loadingIndicator = false; }, 1500);
    });

    translateService.setDefaultLang('fr');
    translateService.setDefaultLang(LoginComponent.translation ? LoginComponent.translation.currentLang : 'fr');
  }

  ngOnInit() {
    this.reportingService.getListEntites().subscribe(data => this.entites = data);
    this.reportingService.getListAnneesExercice().subscribe(data => this.annees = data);
    this.reportingService.getListCapitals().subscribe(data => this.capitals = data);
    this.reportingService.getListTypeControles().subscribe(data => this.typeControles = data);
  }

  public search_financier(entite, an): void {
    this.isSubmitted = true;
    this.reportingService.getPertesParEntite(an).subscribe((pertes: PertesParEntite[]) => {
      this.pertes = pertes['pertes'];
      this.sources_pertes = pertes['sources_pertes'];
      this.sources_pertes_ra = pertes['sources_pertes_ra'];
      this.sources_pertes_fra = pertes['sources_pertes_fra'];
    });
    if ( entite === 'groupe' ) {
      this.reportingService.getReportingsFinancierGroupe(an).subscribe((data: Reporting[]) => {
          this.dataSource = new MatTableDataSource<Reporting>(data);
          this.typologies_pertes = [];
          this.typologies_gains = [];
          this.data = data;
          this.isSubmitted = false;
          data.forEach((value: any, key: any) => {
            this.pour_ca_total = [
              { 'name': 'Total Pertes', 'value': value.moy_pour_loss },
              { 'name': 'Total Sauvés', 'value': value.moy_pour_save }
            ];
            const controles = value.controles;
            controles.forEach((val: any) => {
              this.typologies_pertes.push({'name': val.label_loss_tc, 'value': val.loss_tc_annuel});
              this.typologies_gains.push({'name': val.label_save_tc, 'value': val.save_tc_annuel});
            });
          });
        },
        (err: HttpErrorResponse) => { this.isSubmitted = false; }
      );
      this.reportingService.getPertesSauvesParEntite(null, an).subscribe((pertes_sauves: PertesParEntite[]) => {
        this.taux_sauves = [];
        this.pertes_sauves = pertes_sauves;
        pertes_sauves.forEach((value: any, key: any) => {
          this.taux_sauves.push({'name': this.displayedColumns[key], 'value': value[0].value_sauves});
          this.taux_pertes[0].series.push({'name': this.displayedColumns[key], 'value': value[0].value_pertes});
        });
      });
    } else {
      this.reportingService.getReportingsFinancierEntity(entite, an).subscribe((data: Reporting[]) => {
          this.dataSource = new MatTableDataSource<Reporting>(data);
          this.typologies_pertes = [];
          this.typologies_gains = [];
          this.data = data;
          this.isSubmitted = false;
          data.forEach((value: any, key: any) => {
            this.pour_ca_total = [
              { 'name': 'Total Pertes', 'value': value.moy_pour_loss },
              { 'name': 'Total Sauvés', 'value': value.moy_pour_save }
            ];
            const controles = value.controles;
            controles.forEach((val: any) => {
              this.typologies_pertes.push({'name': val.label_loss_tc, 'value': val.loss_tc_annuel});
              this.typologies_gains.push({'name': val.label_save_tc, 'value': val.save_tc_annuel});
            });
          });
        },
        (err: HttpErrorResponse) => { this.isSubmitted = false; }
      );
      this.reportingService.getPertesSauvesParEntite(entite, an).subscribe((pertes_sauves: PertesParEntite[]) => {
        this.taux_sauves = [];
        this.pertes_sauves = pertes_sauves;
        pertes_sauves.forEach((value: any, key: any) => {
          this.taux_sauves.push({'name': this.displayedColumns[key], 'value': value[0].value_sauves});
          this.taux_pertes[0].series.push({'name': this.displayedColumns[key], 'value': value[0].value_pertes});
        });
      });
    }
    setTimeout(() => { this.loadingIndicator = false; }, 1500);
  }

  onChange(e) {
    this.selected = e;
  }

  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  exportAsExcel() {
    const date = new Date();
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement, { raw: true });
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'reporting-financier-' + date + '.xlsx');
  }

  yLeftAxisScale(min, max) {
    return {min: `${min}`, max: `${max}`};
  }
  yRightAxisScale(min, max) {
    return {min: `${min}`, max: `${max}`};
  }
  yLeftTickFormat(data) {
    return `${data} F cfa`;
  }
  yRightTickFormat(data) {
    return `${data} F cfa`;
  }
}
