import { Component, ViewChild, ElementRef } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { AppSettings } from '../../../app.settings';
import { Settings } from '../../../app.settings.model';
import {Controle} from '../list-controle/controle.model';
import {Observable} from 'rxjs/Rx';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import {MatDialog} from '@angular/material';
import {ViewControleDialogComponent} from '../list-controle/view-controle-dialog/view-controle-dialog.component';
import { ControlesService } from '../list-controle/controles.service';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-mes-controles',
  templateUrl: './mes-controles.component.html'
})
export class MesControlesComponent {
  @ViewChild(DatatableComponent) table: DatatableComponent;
  editing = {};
  rows = [];
  temp = [];
  selected = [];
  loadingIndicator: boolean = true;
  reorderable: boolean = true;
  controle: Controle;
  columns = [
      { prop: 'id' },
      { name: 'reference' },
      { name: 'libelle' },
      { name: 'maturite' },
      { name: 'etat' },
      { name: 'type_controle' },
      { name: 'activite' }
  ];
  public settings: Settings;

  constructor(public appSettings:AppSettings, public http: HttpClient, public dialog: MatDialog,
              public controleService: ControlesService, public router: Router) {
    this.settings = this.appSettings.settings;
    /*
     this.fetch((data) => {
     this.temp = [...data];
     this.rows = data;
     setTimeout(() => { this.loadingIndicator = false; }, 1500);
     });*/
    this.getListeControles().subscribe(data => {
      this.temp = [...data];
      this.rows = data;
      setTimeout(() => { this.loadingIndicator = false; }, 1500);
    });
  }

  ngOnInit() {
    this.controleService.selectedControle = null;
  }

  fetch(data) {
    const req = new XMLHttpRequest();
    req.open('GET', 'assets/data/company.json');
    req.onload = () => {
      data(JSON.parse(req.response));
    };
    req.send();
  }

  getListeControles(): Observable<Controle[]> {
    return this.controleService.getUserControles();
  }

  public addControle(controle:Controle){
    this.controleService.addControle(controle).subscribe(controle => this.getListeControles());
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(function(d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows = temp;
    this.table.offset = 0;
  }

  updateValue(event, cell, rowIndex) {
    this.editing[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
  }

  onSelect({ selected }) {
    console.log('Select Event', selected, this.selected);
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onActivate(event) {
    console.log('Activate Event', event);
  }

  public updateControle(controle: Controle) {
    // this.usersService.updateControle(controle).subscribe(user => this.getListeControles());
  }


  public showControleDialog(idControle) {
    this.rows.forEach( (value: Controle, index: number) => {
      if(value.id ===  idControle) {
        this.controle = value;
        // console.log(controle);
      }
    });
    let dialogRef = this.dialog.open(ViewControleDialogComponent, {
      data: this.controle
    });
  }

  public editControle(controle) {
    this.controleService.selectedControleFiliale = controle //On envoie le controle au service
    this.router.navigateByUrl('/controles/new-controle');
  }


  getControleById(id): Observable<Controle> {
    return this.http.get<Controle>(this.appSettings.rootUrl + 'api/controle/' + id);
  }

  deleteControle(row: any){
    console.log(row);
  }

  detailsControle(controle){
    //console.log(controle);
    this.controleService.selectedControleFiliale = controle;
    localStorage.setItem('selectedControleFiliale', JSON.stringify(controle));
    var currentTime = new Date();
    var year = currentTime.getFullYear();
    this.router.navigateByUrl('/controles/details-controle');
  }

  exportAsExcel()
  {
    var date = new Date();
    //const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);//converts a DOM TABLE element to a worksheet
    //const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.element);
    const ws: XLSX.WorkSheet=XLSX.utils.json_to_sheet(this.table.rows); //convertir donn�es json  en fichier excel
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    //console.log(this.table.rows);
    /* save to file */
    XLSX.writeFile(wb, 'Controles-'+date+'.xlsx');

  }

}
