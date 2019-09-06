import { Component, ViewChild, Input  } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { AppSettings } from '../../../app.settings';
import { Settings } from '../../../app.settings.model';
import {Controle} from '../../controles/list-controle/controle.model';
import {Observable} from 'rxjs/Rx';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {MatDialog} from '@angular/material';
import { ControlesService } from '../../controles/list-controle/controles.service';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';
import { ControleDialogComponent } from './controle-dialog/controle-dialog.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatSnackBar } from '@angular/material';
import * as XLSX from 'xlsx';
import {LoginComponent} from '../../login/login.component';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-controle',
  templateUrl: './controles.component.html'
})
export class ControlesComponent {
  @Input() isChecked: boolean;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  editing = {};
  rows = [];
  temp = [];
  selected = [];
  loadingIndicator: boolean = true;
  reorderable: boolean = true;
  @Input() device: any = [];
  checkedBtn: any[] = [];
  viewFilter = false;
  currentUser: any;
  //readonly rootUrl = 'http://213.154.64.77/usersdir/mohamed/opera/web/app_dev.php/';
  //readonly rootUrl = 'http://localhost/opera/web/app_dev.php/';
  //readonly rootUrl = 'http://213.154.64.77/usersdir/mabiala/opera-server/web/app_dev.php/';
  //readonly rootUrl = 'http://10.90.22.191/usersdir/mabiala/opera-server/web/app_dev.php/';
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
  public msg : string;
  public isSubmitted = false;

  constructor(public appSettings: AppSettings, public http: HttpClient, public dialog: MatDialog, translateService: TranslateService,
              public controleService: ControlesService, public router: Router,  public snackBar: MatSnackBar,
              private toastr: ToastrService) {
    this.settings = this.appSettings.settings;
      this.controleService.getNewControles().subscribe(data => {
        this.temp = [...data];
        this.rows = data;
        setTimeout(() => { this.loadingIndicator = false; }, 1500);
      });
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (this.currentUser.profil.code === 'ANIMATEUR') {
          this.viewFilter = true;
      }

    translateService.setDefaultLang('fr');
    translateService.setDefaultLang(LoginComponent.translation ? LoginComponent.translation.currentLang : 'fr');
  }

  ngOnInit() {
    this.controleService.selectedControle = null;
  }


  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(function(d) {
      return d.libelle.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows = temp;
    this.table.offset = 0;
  }

  getControleById(id): Observable<Controle> {
    return this.http.get<Controle>(this.appSettings.rootUrl + 'api/controle/' + id);
  }

  activerFiliale(controle){
    this.controleService.selectedControle = controle;
    localStorage.setItem('selectedControle', JSON.stringify(controle));

    this.router.navigateByUrl('/controles/activation-filiale');
  }

    detailsControle(controle) {
        this.controleService.selectedControle = controle;
        localStorage.setItem('selectedControle', JSON.stringify(controle));
        this.router.navigateByUrl('/parametres/infos-controle');
    }

    public editControle(controle) {
        this.controleService.selectedControle = controle;
        this.router.navigateByUrl('/controles/new-controle');
    }

    configModele(controle) {
        this.controleService.selectedControle = controle;
        localStorage.setItem('selectedControle', JSON.stringify(controle));
        this.router.navigateByUrl('/controles/config-modele');
    }

    onToggleChanged(controle, $event, index){
      this.msg = 'Êtes-vous sûr de vouloir activer ce contrôle pour cette filiale?';
      const dlg = this.dialog.open(ConfirmationDialogComponent, {
          data: {title: 'Confirmation', msg: this.msg}
       });

        dlg.afterClosed().subscribe((action: boolean) => {
            if (action) {
                this.accept(controle);
            }
            else{
                this.toggleReset(index);
            }
        });
    }

    accept(controle) {
        //let dt = {id: controle.id, etat: etat};
        //this.isSubmitted = true;
        const dlg = this.dialog.open(ControleDialogComponent, {
            data: controle
        });
    }

    toggleReset(i): void {
        // this.isChecked = !this.isChecked;
        this.device[i] = !this.device[i];
    }

}


