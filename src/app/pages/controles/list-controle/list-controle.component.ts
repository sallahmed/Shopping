import { Component, ViewChild, Input  } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { AppSettings } from '../../../app.settings';
import { Settings } from '../../../app.settings.model';
import {Controle} from './controle.model';
import {Observable} from 'rxjs/Rx';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {MatDialog} from '@angular/material';
import {ControleDialogComponent} from './controle-dialog/controle-dialog.component';
import { PorteurDialogComponent } from './porteur-dialog/porteur-dialog.component';
import {ViewControleDialogComponent} from './view-controle-dialog/view-controle-dialog.component';
import { ControlesService } from './controles.service';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';
import { Router } from '@angular/router';
import { NewControleComponent } from './new-controle/new-controle.component';
import { ToastrService } from 'ngx-toastr';
import { MatSnackBar } from '@angular/material';
import * as XLSX from 'xlsx';
import {TranslateService} from '@ngx-translate/core';
import {LoginComponent} from '../../login/login.component';

@Component({
  selector: 'app-list-controle',
  templateUrl: './list-controle.component.html'
})
export class ListControleComponent {
  @Input() isChecked: boolean;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  editing = {};
  rows = [];
  temp = [];
  selected = [];
  loadingIndicator: boolean = true;
  reorderable: boolean = true;
  @Input() device: any = [];
  checkedBtn: any[]= [];
  public isSuperAdmin = false;
  public isAdmin = false;
  //readonly rootUrl = 'http://213.154.64.77/usersdir/mohamed/opera/web/app_dev.php/';
  //readonly rootUrl = 'http://localhost/opera/web/app_dev.php/';
  //readonly rootUrl = 'http://213.154.64.77/usersdir/mabiala/opera-server/web/app_dev.php/';
  //readonly rootUrl = 'http://10.90.22.191/usersdir/mabiala/opera-server/web/app_dev.php/';
  controle: Controle; public newControle : NewControleComponent;
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
  public msg : string;
  public isSubmitted = false;

  constructor(public appSettings: AppSettings, public http: HttpClient, public dialog: MatDialog,
              public controleService: ControlesService, public router: Router,  public snackBar: MatSnackBar,
              private toastr: ToastrService, translateService: TranslateService) {
    this.settings = this.appSettings.settings;
    /*
    this.fetch((data) => {
      this.temp = [...data];
      this.rows = data;
      setTimeout(() => { this.loadingIndicator = false; }, 1500);
    });*/
      this.getListeControles().subscribe(data => {
        //console.log(data);
        for (let i = 0; i < data.length; i++) {
            this.device[i] = data[i].statut;
        }
        this.temp = [...data];
        this.rows = data;
        setTimeout(() => { this.loadingIndicator = false; }, 1500);
      });
      translateService.setDefaultLang('fr');
      translateService.setDefaultLang(LoginComponent.translation ? LoginComponent.translation.currentLang : 'fr');
  }

  ngOnInit() {
    this.controleService.selectedControleFiliale = null;
    this.controleService.selectedControle = null;
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (currentUser.profil.id === 1) {
          this.isSuperAdmin = true;
      }
      else if (currentUser.profil.id === 2) {
          this.isAdmin = true;
      }
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
    return this.http.get<Controle[]>(this.appSettings.rootUrl + 'api/les_controles');
  }

  public addControle(controle:Controle){
    this.controleService.addControle(controle).subscribe(controle => this.getListeControles());
  }

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

    onActivate(event) {
      //console.log('Activate Event', event);
    }

    public updateControle(controle: Controle) {
        // this.usersService.updateControle(controle).subscribe(user => this.getListeControles());
    }

    public openControleDialog(controle) {
        let dialogRef = this.dialog.open(ControleDialogComponent, {
            data: controle
        });

        dialogRef.afterClosed().subscribe(controle => {
            if(controle){
                 (controle.id) ? this.updateControle(controle) : this.addControle(controle);
            }
        });
    }

    public showControleDialog(idControle) {
        // console.log(idControle);
        //let controle ;
        // this.getControleById(idControle).subscribe(data => controle);

        this.rows.forEach( (value: Controle, index: number) => {
            if(value.id ===  idControle) {
                this.controle = value;
                // console.log(controle);
            }
        });
        let dialogRef = this.dialog.open(ViewControleDialogComponent, {
            data: this.controle
        });
        // console.log(this.controle);

        //if(this.controle) {

        //}

    }

  public editControle(controleFiliale) {
    //var result = this.rows.filter(c => c.id === idControle);
    //this.controle = this.rows.find((controle: Controle) => controle.id === idControle);
    //this.newControle.controle = controle;
    this.controleService.selectedControle = controleFiliale.controle;
    this.controleService.selectedControleFiliale = controleFiliale; //On envoie le controle au service
    //console.log(controle);
    /*
    this.rows.forEach( (value: Controle, index: number) => {
      if(value.id ===  idControle) {
        this.controle = value;
        this.newControle.controle = value;
        this.controleService.selectedControle = value;
        console.log(this.controle.id);
      }
    });*/
    this.router.navigateByUrl('/controles/new-controle');
  }


  getControleById(id): Observable<Controle> {
    return this.http.get<Controle>(this.appSettings.rootUrl + 'api/controle/' + id);
  }

  deleteControle(controleFiliale: any) {
      this.msg = 'Êtes-vous sûr de vouloir supprimer ce contrôle?';
      const dlg = this.dialog.open(ConfirmationDialogComponent, {
          data: {title: 'Confirmation', msg: this.msg}
      });

      dlg.afterClosed().subscribe((action: boolean) => {
          if (action) {
              this.delete(controleFiliale);
          }
          else {
              //this.toggleReset(index);
          }
      });
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

  detailsControle(controleFiliale){
    this.controleService.selectedControleFiliale = controleFiliale;
    localStorage.setItem('selectedControleFiliale', JSON.stringify(controleFiliale));
    var currentTime = new Date();
    var year = currentTime.getFullYear();
    //console.log(controle.objectif_controle[0]);
    //console.log(row.objectif_controle[0].suivi[0]);
    //console.log(year);
    this.router.navigateByUrl('/controles/details-controle');
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
    //const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);//converts a DOM TABLE element to a worksheet
    //const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.element);
    const ws: XLSX.WorkSheet=XLSX.utils.json_to_sheet(this.table.rows); //convertir données json  en fichier excel
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    //console.log(this.table.rows);
    /* save to file */
    XLSX.writeFile(wb, 'Controles-'+date+'.xlsx');

  }

    onToggleChanged(controleFiliale, $event, index){
      this.msg = controleFiliale.statut == 0? 'Êtes-vous sûr de vouloir activer ce contrôle?' : 'Êtes-vous sûr de vouloir désactiver ce contrôle?';
      const dlg = this.dialog.open(ConfirmationDialogComponent, {
          data: {title: 'Confirmation', msg: this.msg}
       });

        dlg.afterClosed().subscribe((action: boolean) => {
            if (action) {
                this.accept(controleFiliale);
            }
            else{
                this.toggleReset(index);
            }
        });
    }

    accept(controleFiliale) {
        let etat = controleFiliale.statut == 0 ? 1 : 0;
        let dt = {id: controleFiliale.id, etat: etat};
        this.isSubmitted = true;
        this.controleService.editStateControle(dt).subscribe((data: any) => {
                this.isSubmitted = false;
                // this.router.navigateByUrl('/controles/list-controle');
                this.snackBar.open('Opération effectuée avec succès!', 'Confirmation', {
                    duration: 5000,
                });
            },
            (err: HttpErrorResponse) => {
                this.isSubmitted = false;
                this.snackBar.open('Oups!Un problème est survenu lors de cette opération.', 'Echec', {
                    duration: 5000,
                });
            });
    }

    toggleReset(i): void {
        // this.isChecked = !this.isChecked;
        this.device[i] = !this.device[i];
    }

    changePorteur(controleFiliale) {
        const dlg = this.dialog.open(PorteurDialogComponent, {
            data: controleFiliale
        });

        dlg.afterClosed().subscribe(result => {
            this.getListeControles().subscribe(data => {
                this.temp = [...data];
                this.rows = data;
                setTimeout(() => { this.loadingIndicator = false; }, 1500);
            });
        });
    }

}
