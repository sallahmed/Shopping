import { Component, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { AppSettings } from '../../../app.settings';
import { Settings } from '../../../app.settings.model';
import {TypeStructure} from '../../users/user.model';
import {Observable} from 'rxjs/Rx';
import {HttpClient, HttpParams, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {MatDialog} from '@angular/material';
import {TypeStructureDialogComponent} from './type-structure-dialog/type-structure-dialog.component';
import {ConfirmationDialogComponent} from '../../confirmation-dialog/confirmation-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { ControlesService } from '../../controles/list-controle/controles.service';

@Component({
  selector: 'app-type-structure',
  templateUrl: './type-structure.component.html'
})
export class TypeStructureComponent {
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
  ];
  public settings: Settings;
  public msg;

  constructor(public appSettings:AppSettings, public http: HttpClient, public dialog: MatDialog, private toastr: ToastrService,
              private controleService: ControlesService) {
    this.settings = this.appSettings.settings;
      this.getListeTypesStructures().subscribe(data => {
        this.temp = [...data];
        this.rows = data;
        setTimeout(() => { this.loadingIndicator = false; }, 1500);
      });
  }

    getListeTypesStructures(): Observable<TypeStructure[]> {
        return this.http.get<TypeStructure[]>(this.appSettings.rootUrl + 'api/les_types_structures');
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

    public addTypeStructure(typeStructure: TypeStructure) {
        // this.usersService.addControle(controle).subscribe(user => this.getListeControles());
    }
    public updateTypeStructure(typeStructure: TypeStructure) {
        // this.usersService.updateControle(controle).subscribe(user => this.getListeControles());
    }

    public openTypeStructureDialog(typeStructure) {
        let dialogRef = this.dialog.open(TypeStructureDialogComponent, {
            data: typeStructure
        });

        dialogRef.afterClosed().subscribe(result => {
            this.getListeTypesStructures().subscribe(data => {
                this.temp = [...data];
                this.rows = data;
                setTimeout(() => { this.loadingIndicator = false; }, 1500);
            });
        });
    }

    deleteTypeStructure(type: any) {
        this.msg = 'Êtes-vous sûr de vouloir supprimer ce type de structure?';
        const dlg = this.dialog.open(ConfirmationDialogComponent, {
            data: {title: 'Confirmation', msg: this.msg}
        });

        dlg.afterClosed().subscribe((action: boolean) => {
            if (action) {
                this.delete(type);
            }
        });
    }

    delete(type){
        this.loadingIndicator = true;
        this.controleService.deleteTypeStructure(type.id).subscribe((result: any) =>{
                this.temp = [];
                this.toastr.success('Suppression réussie!!');
                this.getListeTypesStructures().subscribe(data => {
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