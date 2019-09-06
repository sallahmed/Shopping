import { Component, ViewChild, ElementRef, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatStepper, MatSnackBar } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Controle, Entite } from '../../../controles/list-controle/controle.model';
import { ControlesService } from '../../../controles/list-controle/controles.service';
import { excelFileValidator } from '../../../../theme/utils/app-validators';
import { ReportingsService } from '../../reportings.service';
import {LoginComponent} from '../../../login/login.component';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-diffusion-porteur-dialog',
  templateUrl: './diffusion-porteur-dialog.component.html',
  styleUrls: ['./diffusion-porteur-dialog.component.scss']
})
export class DiffusionPorteurDialogComponent implements OnInit {
  public form: FormGroup;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  public passwordHide: boolean = true;
  public selected = 'null';
  isLinear = true;
  loadingIndicator: boolean = false;
  loading: boolean = false;
  isSubmitted = false;
  public entites: any[];
  public selectedEntite: any;
  public annees: any[]; public periode; public annee; public anneeSynthese;
  public data: any[]; public dataSynthese: any[]; public tabPeriodes: /*Array<{}>*/ any[];
  public periodes: any[];
  @ViewChild('fileInput')
    fileInput: ElementRef;

  constructor(public dialogRef: MatDialogRef<DiffusionPorteurDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public obj: any,public fb: FormBuilder,public reportingService: ReportingsService,
              public controleService: ControlesService, public snackBar: MatSnackBar,  public router: Router, translateService: TranslateService) {
    this.firstFormGroup = this.fb.group({
      periodicite: this.fb.group({
        id: null,
        libelle: null,
      }),
      year: this.fb.group({
        id: null,
        annee: null,
      }),
      entite: this.fb.group({
        id: null,
        libelle: null,
      })
   });
   this.secondFormGroup = this.fb.group({
      year: this.fb.group({
        id: null,
        annee: null,
      }),
      entite: this.fb.group({
        id: null,
        libelle: null,
      })
   });
    this.controleService.getListEntites().subscribe(data => this.entites = data);
    this.reportingService.getListAnneesExercice().subscribe(data => this.annees = data);

    translateService.setDefaultLang('fr');
    translateService.setDefaultLang(LoginComponent.translation ? LoginComponent.translation.currentLang : 'fr');

    this.periodes = [
        {id: 1, libelle: LoginComponent.translation ? LoginComponent.translation.instant('month.jan') : 'Janvier'},
        {id: 2, libelle: LoginComponent.translation ? LoginComponent.translation.instant('month.feb') : 'Février'},
        {id: 3, libelle: LoginComponent.translation ? LoginComponent.translation.instant('month.mar') : 'Mars'},
        {id: 4, libelle: LoginComponent.translation ? LoginComponent.translation.instant('month.apr') : 'Avril'},
        {id: 5, libelle: LoginComponent.translation ? LoginComponent.translation.instant('month.may') : 'Mai'},
        {id: 6, libelle: LoginComponent.translation ? LoginComponent.translation.instant('month.jun') : 'Juin'},
        {id: 7, libelle: LoginComponent.translation ? LoginComponent.translation.instant('month.jul') : 'Juillet'},
        {id: 8, libelle: LoginComponent.translation ? LoginComponent.translation.instant('month.aug') : 'Août'},
        {id: 9, libelle: LoginComponent.translation ? LoginComponent.translation.instant('month.sept') : 'Septembre'},
        {id: 10, libelle: LoginComponent.translation ? LoginComponent.translation.instant('month.oct') : 'Octobre'},
        {id: 11, libelle: LoginComponent.translation ? LoginComponent.translation.instant('month.nov') : 'Novembre'},
        {id: 12, libelle: LoginComponent.translation ? LoginComponent.translation.instant('month.dec') : 'Décembre'},
    ];
  }

  ngOnInit() {
  }

  close(): void {
    this.dialogRef.close();
  }

  continuerPeriode(data){
    this.selectedEntite = data.entite.id;
    var currentTime = new Date();
    this.tabPeriodes = [];
    this.periode = data.periodicite.id? this.periodes[data.periodicite.id -1].libelle : currentTime.getMonth();
    for (var i = 0; i < data.periodicite.id; i++) {
      this.tabPeriodes[i] = this.periodes[i];
    }
    this.annee = data.year.annee? data.year.annee: currentTime.getFullYear();
    this.loadingIndicator = true;
    this.controleService.getDataDiffusion(data).subscribe((data: any[]) => {
      this.data = data;
      console.log(data);
        /*data.forEach((value: any, key: any) => {
            console.log(value);
        }*/
      setTimeout(() => { this.loadingIndicator = false; }, 1500);
    });
  }

  continuerAnnuel(data){
    var currentTime = new Date();
    this.loading = true;
    this.anneeSynthese = data.year.annee? data.year.annee: currentTime.getFullYear();
    this.controleService.getDataDiffusionAnnuelle(data).subscribe((data: any[]) => {
      this.dataSynthese = data;
      setTimeout(() => { this.loading = false; }, 1500);
    });
  }

}
