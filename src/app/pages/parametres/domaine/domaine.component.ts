import { Component, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { AppSettings } from '../../../app.settings';
import { Settings } from '../../../app.settings.model';
import {Entite} from '../../controles/list-controle/controle.model';
import {Observable} from 'rxjs/Rx';
import {HttpClient, HttpParams, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {MatDialog} from '@angular/material';
import {DomaineDialogComponent} from './domaine-dialog/domaine-dialog.component';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import {ConfirmationDialogComponent} from '../../confirmation-dialog/confirmation-dialog.component';
import { ControlesService } from '../../controles/list-controle/controles.service';
import {LoginComponent} from '../../login/login.component';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-domaine',
  templateUrl: './domaine.component.html'
})
export class DomaineComponent {
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
    { name: 'code' }
  ];
  public settings: Settings;
  public msg: any;

  constructor(public appSettings: AppSettings, public http: HttpClient, public dialog: MatDialog, public router: Router,
              public snackBar: MatSnackBar, private toastr: ToastrService, private controleService: ControlesService, translateService: TranslateService) {
    this.settings = this.appSettings.settings;
      this.getListeDomaine().subscribe(data => {
        this.temp = [...data];
        this.rows = data;
        setTimeout(() => { this.loadingIndicator = false; }, 1500);
      });

     translateService.setDefaultLang('fr');
     translateService.setDefaultLang(LoginComponent.translation ? LoginComponent.translation.currentLang : 'fr');
  }

    getListeDomaine(): Observable<Entite[]> {
        return this.http.get<Entite[]>(this.appSettings.rootUrl + 'api/les_domaines');
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
    // console.log('Select Event', selected, this.selected);
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onActivate(event) {
  }

    deleteDomaine(domaine: any) {
        this.msg = 'Êtes-vous sûr de vouloir supprimer ce domaine?';
        const dlg = this.dialog.open(ConfirmationDialogComponent, {
            data: {title: 'Confirmation', msg: this.msg}
        });

        dlg.afterClosed().subscribe((action: boolean) => {
            if (action) {
                this.delete(domaine);
            }
        });
    }

    delete(domaine){
        this.loadingIndicator = true;
        this.controleService.deleteDomaine(domaine.id).subscribe((result: any) =>{
                this.temp = [];
                this.toastr.success('Suppression réussie!!');
                this.getListeDomaine().subscribe(data => {
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

    public openDomaineDialog(domaine) {
        let dialogRef = this.dialog.open(DomaineDialogComponent, {
            data: domaine
        });

        dialogRef.afterClosed().subscribe(result => {
            this.getListeDomaine().subscribe(data => {
                this.temp = [...data];
                this.rows = data;
                setTimeout(() => { this.loadingIndicator = false; }, 1500);
            });
        });
    }

}