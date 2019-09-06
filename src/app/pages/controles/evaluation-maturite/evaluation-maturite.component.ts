import { Component, ViewChild, Input  } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { AppSettings } from '../../../app.settings';
import { Settings } from '../../../app.settings.model';
import {Controle} from '../../controles/list-controle/controle.model';
import {Observable} from 'rxjs/Rx';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {MatDialog} from '@angular/material';
import { ControlesService } from '../list-controle/controles.service';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatSnackBar } from '@angular/material';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-evaluation-maturite',
  templateUrl: './evaluation-maturite.component.html'
})
export class EvaluationMaturiteComponent {
  @Input() isChecked: boolean;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  editing = {};
  rows = [];
  temp = [];
  selected = [];
  loadingIndicator = true;
  reorderable = true;
  @Input() device: any = [];
  checkedBtn: any[] = [];
  controle: Controle;
  columns = [
    { prop: 'id' },
    { prop: 'reference' },
    { name: 'maturite' },
    { name: 'ecart' },
    { name: 'correction' },
    { name: 'impact' },
    { name: 'taux_pertes' },
    { name: 'tendance_ecart' },
    { name: 'sensibilite' },
    { name: 'niveau_maitrise' }
  ];
  public settings: Settings;
  public msg: string;
  public isSubmitted = false;
  public nbreCtrlMtrises = 0;
  public nbreTotalCtrl = 1;
  public tauxMaitrise: number;

  constructor(public appSettings: AppSettings, public http: HttpClient, public dialog: MatDialog,
              public controleService: ControlesService, public router: Router,  public snackBar: MatSnackBar,
              private toastr: ToastrService) {
    this.settings = this.appSettings.settings;
      this.getListeControles().subscribe(data => {
        this.temp = [...data];
        this.rows = data;
        this.nbreTotalCtrl = data.length;
        data.forEach((value: any, index) => {
          if (value.sensibilite === 1 && value.taux === 1 && value.corection === 1) {
            this.nbreCtrlMtrises += 1;
          }
        });
        this.tauxMaitrise = (this.nbreCtrlMtrises / this.nbreTotalCtrl) *100;
        setTimeout(() => { this.loadingIndicator = false; }, 1500);
      });
  }

  ngOnInit() {
    this.controleService.selectedControleFiliale = null;
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
    return this.http.get<Controle[]>(this.appSettings.rootUrl + 'api/evaluation_maturite');
  }

    onActivate(event) {}

  updateFilter(event) {

    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(function(d) {
      return d.libelle.toLowerCase().indexOf(val) !== -1 || !val;
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


  getControleById(id): Observable<Controle> {
    return this.http.get<Controle>(this.appSettings.rootUrl + 'api/controle/' + id);
  }

    delete(controleFiliale){
          this.loadingIndicator = true;
          this.controleService.deleteControle(controleFiliale.id).subscribe((data: any) =>{
                  this.temp = [];
                  this.toastr.success('Suppression réussie!!');
                  this.getListeControles().subscribe(data => {
                      this.temp = [...data];
                      this.rows = data;
                      setTimeout(() => { this.loadingIndicator = false; }, 1500);
                  });
              },
              (err: HttpErrorResponse) => {
                  this.toastr.error('Oups!!Une erreur s\'est produite lors de l\'enregistrement.Veuillez contacter l\'administrateur!' );
              }
          );
    }


  activerFiliale(controleFiliale){
    this.controleService.selectedControleFiliale = controleFiliale;
    localStorage.setItem('selectedControleFiliale', JSON.stringify(controleFiliale));

    this.router.navigateByUrl('/controles/activation-filiale');
  }

    configModele(controleFiliale){
        this.controleService.selectedControleFiliale = controleFiliale;
        localStorage.setItem('selectedControleFiliale', JSON.stringify(controleFiliale));
        this.router.navigateByUrl('/controles/config-modele');
    }

  exportAsExcel()
  {
    var date = new Date();
    const ws: XLSX.WorkSheet=XLSX.utils.json_to_sheet(this.table.rows); //convertir données json  en fichier excel
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, 'Controles-'+date+'.xlsx');

  }


}
