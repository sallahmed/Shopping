import { Component,ViewChild, OnInit, Inject, ElementRef } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA, MatTable, MatTableDataSource, MatPaginator  } from '@angular/material';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Statistique, Suivi, Entite } from '../../controles/list-controle/controle.model';
import { ControlesService } from '../../controles/list-controle/controles.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ChartDataModel } from '../chartData.model';
import { barChart, lineChartSeries } from '../features/combo-chart-data';
import {ParamDiffusionDialogComponent} from './param-diffusion-dialog/param-diffusion-dialog.component';
import {TableExport} from 'tableexport';

import * as XLSX from 'xlsx';
import {TranslateService} from '@ngx-translate/core';
import {LoginComponent} from '../../login/login.component';

@Component({
    selector: 'app-reporting-compliance-dialog',
    templateUrl: './reporting-compliance.component.html',
    styleUrls: ['./reporting-compliance.component.scss']
})
export class ReportingComplianceComponent implements OnInit {
    @ViewChild('table',{ read: ElementRef }) table: ElementRef; //marche uniquement pour table et non mat-table
    //@ViewChild(MatTable) table: MatTable<any>; //marche uniquement pour mat-table
    @ViewChild(MatPaginator) paginator: MatPaginator;
    //@ViewChild('table') table: ElementRef;
    public form: FormGroup;
    public statistiques: Statistique[];
    public suivi: Suivi;
    isSavingError = false;
    isSubmitted = false;
    lblMessage = '';
    selected = 'null';selected1 = 'null';selected2 = 'null';selected3 = 'null';
    typeControles: any[]; domaines: any[]; entites: any[]; porteurs: any[]; typologiesPertes: any[];
    /*public displayedColumns = [
     'controle',
     'type_controle',
     'domaine',
     'porteur',
     'entite',
     'perte',
     'sauve'
     ];*/
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
    public realisation = ['Realisés', 'Non réalisés'];
    public dataSource: any;
    data: any[];
    loadingIndicator: boolean = true;
    public cpt: number = 0;

    public explodeSlices = false;
    public doughnut = false;
    public showLabels = true;

    //view = 10;
    //view: any[];
    view: any[] = [1000, 350];
    width = 1000;
    height = 350;
    legendSpacing = 0;
    tooltipDisabled = false;
    legendTitle = 'Légende';

    public showXAxis = true;
    public showYAxis = true;
    public gradient = false;
    public showLegend = true;
    public showXAxisLabel = true;
    public xAxisLabel = /*'Controle'*/ 'Période';
    public showYAxisLabel = true;
    public yAxisLabel = /*'Perte'*/ 'Nombre de contrôles';
    public colorScheme = {
        domain: ['#2F3E9E', '#6CB6F7', '#378D3B', '#0096A6', '#F47B00', '#606060', '#e9724d', '#d6d727', '#92cad1', '#79ccb3', '#868686', '#999']
    };  /*public colorScheme = {domain: ['#999']};*/
    public autoScale = true;
    public roundDomains = true;
    //public ngxData: Array<{name: string, series:Array<{name: string, value:number}>}> = [];
    public ngxData: any[]; public dataVal: any[]; public real: any[] = /*[[ 'realises'],['nonRealises']]*/ [{'name':'Réalisés', 'series':[]} ,{'name':'Non réalisés', 'series':[]}];
    public echeance: any[] /*= [{'name':'Echus', 'series':[]} ,{'name':'Non echus', 'series':[]}]*/;
    public val: any[] = [{'name':'Valorisés', 'series':[]} ,{'name':'Non valorisés', 'series':[]}];
    public taux: any[] = [{'name':'Taux réalisation', 'series':[]} ,{'name':'Taux valorisation', 'series':[]}];
    public tauxReal: any[] = [{'name':'Taux de réalisation', 'series':[]}];
    public tauxVal: any[] = [{'name':'Taux de valorisation', 'series':[]}];
    /*ngxData: any = [
     {
     name: '',
     series: [
     {
     "name": '',
     "value": null
     }
     ]
     }
     ];*/
    gaugeValue: number = 50; // linear gauge value
    gaugePreviousValue: number = 70;
    // Combo Chart
    barChart: any[] = barChart;
    lineChartSeries: any[] = lineChartSeries;
    lineChartScheme = {
        name: 'coolthree',
        selectable: true,
        group: 'Ordinal',
        domain: [
            '#ff3d00', '#6CB6F7', '#a8385d', '#7aa3e5'
        ]
    };
    comboBarScheme = {
        name: 'singleLightBlue',
        selectable: true,
        group: 'Ordinal',
        domain: [
            '#6CB6F7'
        ]
    };
    chartType = 'combo-chart';
    showGridLines: boolean = true;
    //view: boolean = true;
    //view: any[] = [700, 400];
    showRightYAxisLabel: boolean = true;
    yAxisLabelRight: string = 'Taux de réalisation';

    constructor(/*public dialogRef: MatDialogRef<NewControleComponent>,
                 @Inject(MAT_DIALOG_DATA) public controle: Controle,*/
                public router: Router, private toastr: ToastrService, public dialog: MatDialog,
                public fb: FormBuilder, public controleService: ControlesService, private translateService: TranslateService) {
        this.form = this.fb.group({
            id: null,
            type_controle: this.fb.group({
                id: null,
                libelle: null,
                code: null,
            }),/*
             typologie_perte: this.fb.group({
             id: [null, Validators.compose([Validators.required])],
             libelle: null
             }),*/
            domaine: this.fb.group({
                id: null,
                libelle: null
            }),
            porteur: this.fb.group({
                id: null,
                nom: null,
                prenom: null,
            }),
            entite: this.fb.group({
                id: null,
                libelle: null,
            }),
            //date_debut: null,
            //date_fin: null
        });

        translateService.setDefaultLang('fr');
        translateService.setDefaultLang(LoginComponent.translation ? LoginComponent.translation.currentLang : 'fr');

        this.controleService.getDataCompliance(null).subscribe((data: any[]) => {
            this.dataSource = new MatTableDataSource<any>(data);
            this.ngxData = []; this.dataVal = []; //this.series = [];
            this.data = data ;
            this.echeance = [];
            //console.log(this.series[0].series);
            //console.log(this.series);
            data.forEach((value : any, key: any) => {
                //console.log(value[0]);
                var date = new Date(value.date);
                this.ngxData.push({"name": this.displayedColumns[key], "value": value.nbreControles});
                this.dataVal.push({"name": this.displayedColumns[key], "value": value.pourcentageValorisation});
                /*this.series.push({"name":'realise', "series":[{"name":this.displayedColumns[key], "value":value.realises},
                 {"name":this.displayedColumns[key], "value":value.nonRealises}]});*/
                this.echeance.push({"name":this.displayedColumns[key], "series":[{"name":"Echus", "value":value.echus},
                    {"name":"NonEchus", "value":value.nonEchus}]});
                //this.echeance[0].series.push({"name":this.displayedColumns[key], "value":value.echus});
                //this.echeance[1].series.push({"name":this.displayedColumns[key], "value":value.nonEchus});
                this.real[0].series.push({"name":this.displayedColumns[key], "value":value.realises});
                this.real[1].series.push({"name":this.displayedColumns[key], "value":value.nonRealises});
                this.val[0].series.push({"name":this.displayedColumns[key], "value":value.valorises});
                this.val[1].series.push({"name":this.displayedColumns[key], "value":value.nonValorises});
                this.taux[0].series.push({"name":this.displayedColumns[key], "value":value.pourcentageRealisation});
                this.taux[1].series.push({"name":this.displayedColumns[key], "value":value.pourcentageValorisation});
                this.tauxReal[0].series.push({"name":this.displayedColumns[key], "value":value.pourcentageRealisation});
                this.tauxVal[0].series.push({"name":this.displayedColumns[key], "value":value.pourcentageValorisation});
                /*this.series[0] .push({"name":'réaliseries":[{"name":this.displayedColumns[key], "value":value.realises}]},
                 {"name":'Non réalisés', "series":[{"name":this.displayedColumns[key], "value":value.nonRealises}]});*/
            });
            //this.data.push(data);
            setTimeout(() => { this.loadingIndicator = false; }, 1500);
            //console.log(Array.of(data));
        });
    }

    ngOnInit() {
        this.controleService.getListTypesControles().subscribe(data => this.typeControles = data);
        //this.controleService.getTypologiePertes().subscribe(data => this.typologiesPertes = data);
        this.controleService.getListDomaines().subscribe(data => this.domaines = data);
        this.controleService.getListPorteurs().subscribe(data => this.porteurs = data);
        this.controleService.getListEntites().subscribe(data => this.entites = data);
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


    public rechercher(stat):void {
        this.ngxData = []; this.dataVal = []; this.echeance = [];//initialisation du tableau
        this.real = [{'name':'Réalisés', 'series':[]} ,{'name':'Non réalisés', 'series':[]}];  this.val = [{'name':'Valorisés', 'series':[]} ,{'name':'Non valorisés', 'series':[]}];
        this.taux = [{'name':'Taux réalisation', 'series':[]} ,{'name':'Taux valorisation', 'series':[]}];
        this.tauxReal = [{'name':'Taux réalisation', 'series':[]}];
        this.tauxVal = [{'name':'Taux valorisation', 'series':[]}];
        this.isSubmitted = true;
        this.controleService.getDataCompliance(stat).subscribe((data: any) => {
                //this.dataSource = new MatTableDataSource<Statistique>(data);
                this.data = data;
                data.forEach((value : any, key: any) => {
                    var date = new Date(value.date);
                    this.ngxData.push({"name": this.displayedColumns[key], "value": value.nbreControles});
                    this.dataVal.push({"name": this.displayedColumns[key], "value": value.pourcentageValorisation});
                    this.echeance.push({"name":this.displayedColumns[key], "series":[{"name":"Echus", "value":value.echus},
                        {"name":"NonEchus", "value":value.nonEchus}]});
                    this.real[0].series.push({"name":this.displayedColumns[key], "value":value.realises});
                    this.real[1].series.push({"name":this.displayedColumns[key], "value":value.nonRealises});
                    this.val[0].series.push({"name":this.displayedColumns[key], "value":value.valorises});
                    this.val[1].series.push({"name":this.displayedColumns[key], "value":value.nonValorises});
                    this.taux[0].series.push({"name":this.displayedColumns[key], "value":value.pourcentageRealisation});
                    this.taux[1].series.push({"name":this.displayedColumns[key], "value":value.pourcentageValorisation});
                    this.tauxReal[0].series.push({"name":this.displayedColumns[key], "value":value.pourcentageRealisation});
                    this.tauxVal[0].series.push({"name":this.displayedColumns[key], "value":value.pourcentageValorisation});
                });
                // if(this.dataSource) this.dataSource.paginator = this.paginator;
                //console.log(this.ngxData);
                this.isSubmitted = false;
                //this.form.reset();
            },
            (err: HttpErrorResponse) => {
                this.isSubmitted = false;
            });
    }

    diffuser(form){
        let dialogRef = this.dialog.open(ParamDiffusionDialogComponent, {
            data: form
        });
    }

    exportAsExcel()
    {
        var date = new Date();
        const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement, {raw:true});//converts a DOM TABLE element to a worksheet
        //const ws: XLSX.WorkSheet=XLSX.utils.json_to_sheet(this.dataSource.data); //convertir données json  en fichier excel
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        /* save to file */
       // XLSX.writeFile(wb, 'reporting-compliance-'+date+'.xlsx', {cellStyles:true});

        //tableExport
        new TableExport(document.getElementsByTagName('table'));
    }

    yLeftAxisScale(min, max) {
        return {min: `${min}`, max: `${max}`};
    }
    yRightAxisScale(min, max) {
        return {min: `${min}`, max: `${max}`};
    }
    yLeftTickFormat(data) {
        return `${data.toLocaleString()}`;
    }
    yRightTickFormat(data) {
        return `${data}%`;
    }

    onSelect(event) {
        console.log(event);
    }

    getEntite(event, entite) {
        this.controleService.getPorteursByEntite(this.selected).subscribe(data => this.porteurs = data);
    }
}
