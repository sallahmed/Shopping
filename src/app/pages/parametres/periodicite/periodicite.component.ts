import { Component, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { AppSettings } from '../../../app.settings';
import { Settings } from '../../../app.settings.model';
import {Periodicite} from '../../controles/list-controle/controle.model';
import {Observable} from 'rxjs/Rx';
import {HttpClient, HttpParams, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {MatDialog} from '@angular/material';
import {PeriodiciteDialogComponent} from './periodicite-dialog/periodicite-dialog.component';
import {ConfirmationDialogComponent} from '../../confirmation-dialog/confirmation-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { ControlesService } from '../../controles/list-controle/controles.service';

@Component({
  selector: 'app-periodicite',
  templateUrl: './periodicite.component.html'
})
export class PeriodiciteComponent {
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
    { name: 'code' },
    { name: 'valeur' }
  ];
  public settings: Settings;
  public msg;

  constructor(public appSettings:AppSettings, public http: HttpClient, public dialog: MatDialog,
              private toastr: ToastrService, private controleService: ControlesService) {
    this.settings = this.appSettings.settings;
      this.getListePeriodicites().subscribe(data => {
        this.temp = [...data];
        this.rows = data;
        setTimeout(() => { this.loadingIndicator = false; }, 1500);
      });
  }

    getListePeriodicites(): Observable<Periodicite[]> {
        return this.http.get<Periodicite[]>(this.appSettings.rootUrl + 'api/les_periodicites');
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

    public addPeriodicite(periodicite: Periodicite) {
        // this.usersService.addControle(controle).subscribe(user => this.getListeControles());
    }
    public updatePeriodicite(periodicite: Periodicite) {
        // this.usersService.updateControle(controle).subscribe(user => this.getListeControles());
    }

    public openPeriodiciteDialog(periodicite) {
        let dialogRef = this.dialog.open(PeriodiciteDialogComponent, {
            data: periodicite
        });

        dialogRef.afterClosed().subscribe(result => {
            this.getListePeriodicites().subscribe(data => {
                this.temp = [...data];
                this.rows = data;
                setTimeout(() => { this.loadingIndicator = false; }, 1500);
            });
        });
    }

    deletePeriodicite(periodicite: any) {
        this.msg = 'Êtes-vous sûr de vouloir supprimer cette périodicité?';
        const dlg = this.dialog.open(ConfirmationDialogComponent, {
            data: {title: 'Confirmation', msg: this.msg}
        });

        dlg.afterClosed().subscribe((action: boolean) => {
            if (action) {
                this.delete(periodicite);
            }
        });
    }

    delete(periodicite){
        this.loadingIndicator = true;
        this.controleService.deletePeriodicite(periodicite.id).subscribe((result: any) =>{
                this.temp = [];
                this.toastr.success('Suppression réussie!!');
                this.getListePeriodicites().subscribe(data => {
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

}