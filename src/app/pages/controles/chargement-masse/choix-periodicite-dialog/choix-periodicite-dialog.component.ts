import { Component, ViewChild, ElementRef, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatStepper, MatSnackBar } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Controle } from '../../list-controle/controle.model';
import { ControlesService } from '../../list-controle/controles.service';
import { excelFileValidator } from '../../../../theme/utils/app-validators';
import {LoginComponent} from '../../../login/login.component';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-choix-periodicite-dialog',
  templateUrl: './choix-periodicite-dialog.component.html',
  styleUrls: ['./choix-periodicite-dialog.component.scss']
})
export class ChoixPeriodiciteDialogComponent implements OnInit {
  public form: FormGroup;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  public passwordHide: boolean = true;
  public file: File;
  public selected = 'null';
  public annees: any[] = []; public selectedYear: number; public currentYear: number;
  isLinear = true;
  loadingIndicator: boolean = false;
  public obj:any;
  isSubmitted = false;
  public periodicite: any;
  public controleFiliale: any;
  public lesPeriodicites = [];
  public periodicitesJour: any[];
  // public mois = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  public mois: any[];
  public periodicitesAnterieur = [];
  @ViewChild('fileInput')
    fileInput: ElementRef;

  constructor(public dialogRef: MatDialogRef<ChoixPeriodiciteDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public controle: Controle, public fb: FormBuilder, private translateService: TranslateService,
              public controleService: ControlesService, public snackBar: MatSnackBar,  public router: Router) {
    /*this.form = this.fb.group({
      fichier: null,
      periodicite: this.fb.group({
        id: null,
        libelle: null,
      })
    });*/
    this.firstFormGroup = this.fb.group({
      annee: null,
      controle: null,
      periodicite: this.fb.group({
        id: [null, Validators.compose([Validators.required])],
        libelle: null,
      })
    });
    this.secondFormGroup = this.fb.group({
        template: this.fb.group({
            filename: [null, Validators.compose([excelFileValidator, Validators.required])],
            filetype: null,
            value: null
        }),
    });
    let currentTime = new Date();
    this.selectedYear = currentTime.getFullYear();
    this.currentYear = currentTime.getFullYear();

    translateService.setDefaultLang('fr');
    translateService.setDefaultLang(LoginComponent.translation ? LoginComponent.translation.currentLang : 'fr');
    this.periodicitesJour = [{'id': 1, 'libelle': LoginComponent.translation ? LoginComponent.translation.instant('periodes.currentmonth') : 'Mois en cours'},
        {'id': 2, 'libelle': LoginComponent.translation ? LoginComponent.translation.instant('periodes.previousmonth') : 'Mois précédent'},
        {'id': 3, 'libelle': LoginComponent.translation ? LoginComponent.translation.instant('periodes.currentweek') : 'Semaine en cours'},
        {'id': 4, 'libelle': LoginComponent.translation ? LoginComponent.translation.instant('periodes.previousweek') : 'Semaine précédente'}];

      this.mois = [
          LoginComponent.translation ? LoginComponent.translation.instant('month.jan') : 'Janvier',
          LoginComponent.translation ? LoginComponent.translation.instant('month.feb') : 'Février',
          LoginComponent.translation ? LoginComponent.translation.instant('month.mar') : 'Mars',
          LoginComponent.translation ? LoginComponent.translation.instant('month.apr') : 'Avril',
          LoginComponent.translation ? LoginComponent.translation.instant('month.may') : 'Mai',
          LoginComponent.translation ? LoginComponent.translation.instant('month.jun') : 'Juin',
          LoginComponent.translation ? LoginComponent.translation.instant('month.jul') : 'Juillet',
          LoginComponent.translation ? LoginComponent.translation.instant('month.aug') : 'Août',
          LoginComponent.translation ? LoginComponent.translation.instant('month.sept') : 'Septembre',
          LoginComponent.translation ? LoginComponent.translation.instant('month.oct') : 'Octobre',
          LoginComponent.translation ? LoginComponent.translation.instant('month.nov') : 'Novembre',
          LoginComponent.translation ? LoginComponent.translation.instant('month.dec') : 'Décembre'
      ];
  }

  ngOnInit() {
    if(this.controleService.selectedControle)
      this.controle = this.controleService.selectedControle;
    this.firstFormGroup.patchValue({controle: this.controle});
    this.obj = this.controle.objectif_controle;
    this.obj.forEach( (value: any, index: number) => {
          this.annees.push({'id': index, 'annee': value.annee});
    });
    this.controleFiliale = this.controle;
    this.periodicite =  this.controleFiliale.controle.periodicite;
    if (this.periodicite.id === 1 || this.periodicite.id === 2) {
        this.lesPeriodicites = this.periodicitesJour;
    } else if (this.periodicite.id === 3) {
        for (let i = 0; i < 12; i++) {
            this.lesPeriodicites.push({'id': i + 1, 'libelle': this.mois[i] + ' ' + this.currentYear});
        }
    } else {
        this.lesPeriodicites.push({'id': 1, 'libelle': this.periodicite.code + ' ' + this.currentYear});
    }
    this.firstFormGroup.patchValue({annee: this.currentYear});
  }

  close(): void {
    this.dialogRef.close();
  }

    onSelectFile(event) {
        let reader = new FileReader();

        if (event.target.files && event.target.files.length > 0) {
            this.file = event.target.files[0];
            reader.readAsDataURL(this.file);
            reader.onload = () => {
                this.secondFormGroup.get('template').setValue({
                        filename: this.file.name,
                        filetype: this.file.type,
                        value: reader.result.split(',')[1]
                    }
                );
            }
        }
    }

    selectFile(): void {
        this.fileInput.nativeElement.click();
    }

  generer(form, stepper: MatStepper) {
    this.loadingIndicator = true;
    this.controleService.genererFichier(form).subscribe((data: any) => {
          var url = data;
          //console.log(window.URL.createObjectURL(data));
          var a = document.createElement('a');
          a.href = 'http://'+url;
          a.download = 'template.csv';
          //a.download = data;
          a.click();
          window.URL.revokeObjectURL(url);
          a.remove(); // remove the element
          this.loadingIndicator = false;
          stepper.next();
          /*setTimeout(() => { this.loadingIndicator = false; }, 1500);*/
    },
    (err: HttpErrorResponse) => {
      this.loadingIndicator = false;
    });
  }

    public enregistrer(form):void {
        this.isSubmitted = true;
        this.controleService.chargerFichier(form).subscribe((data: any) => {
            this.isSubmitted = false;
            this.secondFormGroup.reset();
            this.dialogRef.close();
            this.router.navigateByUrl('/controles/details-controle');
            this.snackBar.open('Chargement effectué avec succès!', 'Confirmation', {
                duration: 5000,
            });
            /*this.controleService.getControleById(this.controle.id).subscribe((data: any) =>{
                this.controleService.selectedControle = data;
                localStorage.setItem('selectedControle', JSON.stringify(data)); //On enregistre à nouveau le controle avec les nouveaux suivis
                this.router.navigateByUrl('/controles/details-controle');
                //this.dialogRef.close();
                this.snackBar.open('Chargement effectué avec succès!', 'Confirmation', {
                    duration: 5000,
                });
            },
             error => {
                //this.errors = error;
                 console.log(error);
             },
             () => {
                 console.log(data);
               // 'onCompleted' callback.
               // No errors, route to new page here
             });*/
        },
        (err: HttpErrorResponse) => {
            this.isSubmitted = false;
            this.snackBar.open('Oups!Un problème est survenu lors du chargement du fichier, veuillez contacter l\'administrateur.', 'Echec', {
                duration: 5000,
            });
        });
    }

    onChange(event) {
        this.firstFormGroup.patchValue({annee: event.value});
        if (event.value !== this.currentYear) {
            this.lesPeriodicites = [];
            if (this.periodicite.id === 4) {
                this.lesPeriodicites.push({'id': 1, 'libelle': this.periodicite.code + ' ' + event.value});
            } else {
                for (let i = 0; i < 12; i++) {
                    this.lesPeriodicites.push({'id': i + 1, 'libelle': this.mois[i] + ' ' + event.value });
                }
            }
        } else {
            if (this.periodicite.id === 1 || this.periodicite.id === 2) {
                this.lesPeriodicites = this.periodicitesJour;
            } else if (this.periodicite.id === 3) {
                for (let i = 0; i < 12; i++) {
                    this.lesPeriodicites.push({'id': i + 1, 'libelle': this.mois[i] + ' ' + this.currentYear});
                }
            } else {
                this.lesPeriodicites.push({'id': 1, 'libelle': this.periodicite.code + ' ' + this.currentYear});
            }
        }
    }

}
