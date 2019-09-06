import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { AppSettings } from '../../../../app.settings';
import { Settings } from '../../../../app.settings.model';
import {MatDialog} from '@angular/material';
import { SuiviService, Suivi } from './suivi.service';
import { ControlesService } from '../controles.service';
import { Controle} from '../controle.model';
import { Router } from '@angular/router';
import {ChoixPeriodiciteDialogComponent} from '../../chargement-masse/choix-periodicite-dialog/choix-periodicite-dialog.component';
import {ReconductionControleDialogComponent} from '../../reconduction-controle-dialog/reconduction-controle-dialog.component';

@Component({
  selector: 'app-details-controle',
  templateUrl: './details-controle.component.html',
  styleUrls: ['./details-controle.component.css']
})
export class DetailsControleComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public displayedColumns = [
    'jour',
    //'total_HLR',
    //'not_camel',
    //'imsi_prepaid',
    //'volume_mn',
    //'correction',
    //'date_correction',
    'risques_pertes_revenus',
    'pertes',
    'typologie_pertes',
    'revenu_sauves',
    'actions'
  ];
  loadingIndicator: boolean = true;
  currentTemplate: File = null;
  public dataSource: any;
  public settings: Settings;
  public  controleFiliale: Controle|any; public mois: string; public year: number;
  public oc: any; public annees: any[] = []; public selectedYear: number;
  public month: string[] = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre", ];
  constructor(public appSettings:AppSettings, private suiviService:SuiviService,
              private controleService: ControlesService, public router: Router, public dialog: MatDialog) {
    this.settings = this.appSettings.settings;
    //this.dataSource = new MatTableDataSource<Suivi>(this.suiviService.getData());
    //this.oc = this.controleService.selectedControle.objectif_controle.find((oc: any) => oc.annee === this.year);
    var currentTime = new Date();
    this.year = currentTime.getFullYear();
    this.mois = this.month[currentTime.getMonth()]+ ' ' +this.year;
    this.controleFiliale = JSON.parse(localStorage.getItem('selectedControleFiliale'));//Marche
    //this.dataSource = new MatTableDataSource<Suivi>(this.controleService.selectedControle.objectif_controle.find((oc:any) => oc.annee === this.year).suivi);
    //this.dataSource = new MatTableDataSource<Suivi>(this.controle.objectif_controle.find((oc:any) => oc.annee === this.year).suivi); //Marche
    this.dialog.afterAllClosed.subscribe(controle => {
      this.dataSource = null;
      this.loadingIndicator = true;
      this.controleService.getControleFilialeById(this.controleFiliale.id).subscribe((data: any) =>{
        if(data){
          this.controleService.selectedControle = data;
          localStorage.setItem('selectedControleFiliale', JSON.stringify(data)); //On enregistre à nouveau le controle avec les nouveaux suivis
          this.controleFiliale = data;
          //this.selectedYear = data.objectif_controle[0].annee;
            console.log(data.objectif_controle.find((oc: any) => oc.annee === this.year));
          this.selectedYear = data.objectif_controle.find((oc: any) => oc.annee === this.year) ? this.year :
              data.objectif_controle[0].annee;
          this.annees = [];
          data.objectif_controle.forEach( (value: any, index: number) => {
            this.annees.push({'id': index, 'annee': value.annee});
          });
          //this.dataSource = new MatTableDataSource<Suivi>(this.controleFiliale.objectif_controle.find((oc:any) => oc.annee === this.year).suivi);
          //this.dataSource = new MatTableDataSource<Suivi>(this.controleFiliale.objectif_controle[0].suivi); //Premier objectif
          this.dataSource = new MatTableDataSource<Suivi>(this.controleFiliale.objectif_controle.find((oc: any) => oc.annee === this.year) ?
              this.controleFiliale.objectif_controle.find((oc: any) => oc.annee === this.year).suivi : this.controleFiliale.objectif_controle[0].suivi);
          this.dataSource.paginator = this.paginator;
          this.loadingIndicator = false;
        }
      });
    });
  }

  ngOnInit() {
    //const shortMonthName = moment(currentTime).format('MMM')
    if(this.controleService.selectedControleFiliale){
      this.controleFiliale = this.controleService.selectedControleFiliale;
    }
  }

  ngAfterViewInit() {
    //this.dataSource.paginator = this.paginator;
  }

  public saisir(suivi) {
    this.controleService.selectedSuivi = suivi;
    this.router.navigateByUrl('/controles/saisie-suivi');

  }

  downloadFile(controle: any): void {
     //this.router.navigateByUrl('/controles/list-controle');
    //console.log(btoa(controle.template.blob) );
    //console.log(controle.template.path);
    var byteArray = new Uint8Array(controle.template.blob);
    console.log(byteArray);
    const blob: Blob = new Blob([controle.template.blob], {type: 'application/binary'});
    const file = new File([blob], controle.template.filename, { type: controle.template.filetype });
    //const blob: Blob = new Blob([this.s2ab(atob(controle.template.blob))], {type: controle.template.filetype});
    //var blob = new File([controle.template.blob], controle.template.filename);
    const fileName: string = controle.template.filename;
    //const objectUrl: string = URL.createObjectURL(blob);
    const objectUrl: string = controle.template.path;

     var reader = new FileReader();
    reader.readAsDataURL(blob); //Convertir blob en base64
    //reader.readAsArrayBuffer( controle.template.blob); //Convertir blob en buffer
    reader.onloadend = function(event) {
      var base64data = reader.result;
      //var arrayBuffer = event.target.result;
      //var arrayBuffer = reader.result;
      //var bufferBase64 = arrayBuffer.toString('base64');
      //console.log(base64data);
      //console.log(atob(base64data.replace(/^data:image\/(png|jpeg|jpg);base64,/, '')));
      //console.log(atob(base64data.replace(/^data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,/, '')));
      //console.log(atob(base64data.replace("data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,", '')));
    }
    //console.log(source);
    //var bufferBase64 = new Buffer( blob, 'binary' ).toString('base64');

    const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;
    a.href = objectUrl;
    //a.download = fileName;
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(objectUrl);

  }

  s2ab(s) { //s2ab (string to array buffer)
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
  }

  binaryDecode = function (data) {
    var ret = '';
    if (data) {
      var byteArray = new Uint8Array(data);
      for (var i = 0; i < data.byteLength; i++) {
        ret = ret + String.fromCharCode(byteArray[i]);
      }
    }
    return ret;
  };

  goToUrl(): void {
    //this.document.location.href = 'https://stackoverflow.com';
  }

  charger(controle){
    let dialogRef = this.dialog.open(ChoixPeriodiciteDialogComponent, {
      data: controle
    });

    /*dialogRef.afterClosed().subscribe(controle => {
      this.controleService.getControleById(this.controle.id).subscribe((data: any) =>{
        localStorage.setItem('selectedControle', JSON.stringify(data)); //On enregistre à nouveau le controle avec les nouveaux suivis
      });
     });*/
  }

  reconduire(controleFiliale) {
      let dialogRef = this.dialog.open(ReconductionControleDialogComponent, {
          data: controleFiliale
      });
  }

    onChange(event) {
        this.loadingIndicator = true;
        this.dataSource = new MatTableDataSource<Suivi>(this.controleFiliale.objectif_controle.find((oc: any) => oc.annee === event.value) ?
            this.controleFiliale.objectif_controle.find((oc: any) => oc.annee === event.value).suivi : this.controleFiliale.objectif_controle[0].suivi);
        this.dataSource.paginator = this.paginator;
        this.loadingIndicator = false;
    }

}
