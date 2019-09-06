import { Component, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { AppSettings } from '../../../app.settings';
import { Settings } from '../../../app.settings.model';
import {Dysfonctionnement} from '../../controles/list-controle/controle.model';
import {Observable} from 'rxjs/Rx';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import {MatDialog} from '@angular/material';
import { ControlesService } from '../list-controle/controles.service';
import {DetailDysfonctionnementDialogComponent} from './detail-dysfonctionnement-dialog/detail-dysfonctionnement-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dysfonctionnement',
  templateUrl: './dysfonctionnement.component.html'
})
export class DysfonctionnementComponent {
  @ViewChild(DatatableComponent) table: DatatableComponent;
  editing = {};
  rows = [];
  temp = [];
  selected = [];
  loadingIndicator: boolean = true;
  reorderable: boolean = true;
  columns = [
    { prop: 'id' },
    { name: 'libelle' },
    { name: 'dateDebut' },
    { name: 'dateFin' },
    { name: 'controle' },
    { name: 'porteur' },
    { name: 'statut' }
  ];
  public settings: Settings;

  constructor(public appSettings:AppSettings, public http: HttpClient, public dialog: MatDialog,
              public controleService: ControlesService, public router: Router) {
    this.settings = this.appSettings.settings;
    this.getListePA().subscribe(data => {
      this.temp = [...data];
      this.rows = data;
      setTimeout(() => { this.loadingIndicator = false; }, 1500);
    });
  }

  getListePA(): Observable<Dysfonctionnement[]> {
    return this.http.get<Dysfonctionnement[]>(this.appSettings.rootUrl + 'api/les_dysfonctionnements');
  }


  public add(dysf: Dysfonctionnement) {
  }
  public update(dysf: Dysfonctionnement) {
  }

  details(dysfonctionnement){
    let dialogRef = this.dialog.open(DetailDysfonctionnementDialogComponent, {
      data: dysfonctionnement
    });
    /*
    dialogRef.afterClosed().subscribe(controle => {
      if(controle){
        (controle.id) ? this.updateControle(controle) : this.addControle(controle);
      }
    });*/
  }

  public edit(dysfonctionnement) {
    this.controleService.selectedDysfonctionnement = dysfonctionnement
    this.router.navigateByUrl('/controles/new-dysfonctionnement');
  }

  deleteControle(row: any){
    if(confirm("Voulez-vous supprimer le dysfonctionnement "+row.libelle + " ?")) {
      /*this.controleService.deleteControle(row.id).subscribe((data: any) =>{
            location.reload();
            this.toastr.success('Suppression r�ussie!!');
          },
          (err: HttpErrorResponse) => {
            this.toastr.error('Oups!!Une erreur s\'est produite lors de l\'enregistrement.Veuillez contacter l\'administrateur!' );
          }
      );*/
    }
  }
  traiter(dysfonctionnement){
    this.controleService.selectedDysfonctionnement = dysfonctionnement;
    //localStorage.setItem('selectedControle', JSON.stringify(controle));
    this.router.navigateByUrl('/controles/traitement-dysfonctionnement');
  }

  updateFilter(event){}
  onSelect(event){}
}