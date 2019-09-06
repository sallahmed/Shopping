import { Component,ViewChild, OnInit, Inject, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTable, MatTableDataSource, MatPaginator  } from '@angular/material';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Statistique, Suivi } from '../../controles/list-controle/controle.model';
import { ControlesService } from '../../controles/list-controle/controles.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ChartDataModel } from '../chartData.model';
import { ReportingsService } from '../reportings.service';
import * as XLSX from 'xlsx';
import {LoginComponent} from '../../login/login.component';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-reporting-synthese-dialog',
  templateUrl: './reporting-synthese.component.html',
  styleUrls: ['./reporting-synthese.component.scss']
})
export class ReportingSyntheseComponent implements OnInit {
  @ViewChild('table',{ read: ElementRef }) table: ElementRef; //marche uniquement pour table et non mat-table
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public form: FormGroup;
  public statistiques: Statistique[];
  public suivi: Suivi;
  isSavingError = false;
  isSubmitted = false;
  lblMessage = '';
  selected = 'null'; selected1 = 'null';
  typeControles: any[]; domaines: any[]; entites: any[]; porteurs: any[]; typologiesPertes: any[];
  public dataSource: any;
  data: any[];
  loadingIndicator: boolean = true;
  public cpt: number = 0;
  public annees: any[]; year: number; today: Date;
  public displayedColumns = [
    //'indicateurs',
    'janvier',
    'fevrier',
    'mars',
    'avril',
    'mai',
    'juin',
    'juillet',
    'aout',
    'septembre',
    'octobre',
    'novembre',
    'decembre'
  ];

  //public ngxData: Array<{name: string, series:Array<{name: string, value:number}>}> = [];
  public real: any[] = /*[[ 'realises'],['nonRealises']]*/ [{'name':'Réalisés', 'series':[]} ,{'name':'Non réalisés', 'series':[]}];
  constructor(/*public dialogRef: MatDialogRef<NewControleComponent>,
              @Inject(MAT_DIALOG_DATA) public controle: Controle,*/
              public router: Router, private toastr: ToastrService, private translateService: TranslateService,
              public fb: FormBuilder, public controleService: ControlesService, public reportingService: ReportingsService) {
    this.form = this.fb.group({
      id: null,
      entite: this.fb.group({
        id: null,
        libelle: null,
      }),
      domaine: this.fb.group({
        id: null,
        libelle: null
      }),
      annee: null
    });

    let currentTime = new Date();
    this.today = new Date();
    this.year = currentTime.getFullYear();
    this.controleService.getDataSynthese(null).subscribe((data: any[]) => {
      this.dataSource = new MatTableDataSource<any>(data);
      this.data = data;
      setTimeout(() => { this.loadingIndicator = false; }, 1500);
      //console.log(this.data);
    });
    this.controleService.getListEntites().subscribe(data => this.entites = data);
    this.controleService.getListDomaines().subscribe(data => this.domaines = data);
    this.reportingService.getListAnneesExercice().subscribe(data => this.annees = data);

    translateService.setDefaultLang('fr');
    translateService.setDefaultLang(LoginComponent.translation ? LoginComponent.translation.currentLang : 'fr');
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  close(): void {
    //this.dialogRef.close();
  }


  resetForm(form?: FormGroup) { // ? signifie paramètre
    if (form)
      this.form.reset();
  }


  exportAsExcel()
  {
    var date = new Date();
    const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement, {raw:true});//converts a DOM TABLE element to a worksheet
    //const ws: XLSX.WorkSheet=XLSX.utils.json_to_sheet(this.dataSource.data); //convertir données json  en fichier excel
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, 'reporting-compliance-'+date+'.xlsx', {cellStyles:true});
  }

  public rechercher(obj):void {
    this.isSubmitted = true;
    this.controleService.getDataSynthese(obj).subscribe((data: any) => {
          this.data = data;
          this.isSubmitted = false;
          //this.form.reset();
        },
        (err: HttpErrorResponse) => {
          this.isSubmitted = false;
        });
  }
}
