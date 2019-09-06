import { Component,ViewChild, ElementRef, OnInit, Inject, Pipe, PipeTransform } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, FormArray, Validators} from '@angular/forms';
import { ControlesService } from '../list-controle/controles.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { MatSnackBar } from '@angular/material';
import {ExcludePipe} from '../pipe/exclude.pipe';
import {excelFileValidator} from '../../../theme/utils/app-validators';

@Component({
  selector: 'app-config-modele',
  templateUrl: './config-modele.component.html',
  styleUrls: ['./config-modele.component.scss']
})
export class ConfigModeleComponent implements OnInit {
  public form: FormGroup;
  public firstFormGroup: FormGroup;
  public secondFormGroup: FormGroup;
  isSubmitted = false;
  public controle;
  public nbreChamps: number;
  public colonnes = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
      'AA','AB','AC','AD','AE','AF','AG','AH','AI','AJ','AK','AL','AM','AN','AO','AP','AQ','AR','AS','AT','AU','AV','AW','AX'];
  public select = [];
  public arrChamps = []
  entries = [];
  selectedEntry;

  constructor(public router: Router, private toastr: ToastrService,
              public fb: FormBuilder, public controleService: ControlesService, public snackBar: MatSnackBar) {
      this.firstFormGroup = this.fb.group({
          nombre: [null, Validators.compose([Validators.required])],
          /*periodicite: this.fb.group({
              id: [null, Validators.compose([Validators.required])],
              libelle: null,
          })*/
      });
      this.secondFormGroup = this.fb.group({
          controle: null,
          //champs: this.fb.array([{}]),
          champs: this.fb.group([this.getChamp()]),
          nbre: null,
          numDebut: [null, Validators.compose([Validators.required])]
      });
  }

  ngOnInit() {
    if(this.controleService.selectedControle){
      this.controle = this.controleService.selectedControle;
    }
    else if(localStorage.getItem('selectedControle')) {
        this.controle = JSON.parse(localStorage.getItem('selectedControle'));
      }
  }


  resetForm(form?: FormGroup) { // ? signifie paramètre
    if (form)
      this.form.reset();
  }

  public executer(data):void {
    // console.log(data);
    this.nbreChamps = data.nombre;
    const control = <FormArray>this.secondFormGroup.controls['champs'];
    const items = this.secondFormGroup.get('champs') as FormArray;
    for(let i=0; i < data.nombre; i++) {
        this.arrChamps[i] = this.getChamp();
    }

    this.secondFormGroup = this.fb.group({
       controle: null,
       champs: this.fb.group(this.arrChamps),
       nbre: null,
       numDebut: [null, Validators.compose([Validators.required])]
   });
      this.secondFormGroup.patchValue({nbre: data.nombre});
    if(this.controle)
        this.secondFormGroup.patchValue({controle: this.controle.id});
  }

  public counter(i: number) {
     return new Array(i);
  }
  public counterSup(i: number) {
     let index = i - 5;
     return new Array(index);
  }

    public save(myData):void {
        this.isSubmitted = true;
        this.controleService.addModele(myData).subscribe((data: any) => {
                if(data.Succeeded === true){
                    this.isSubmitted = false;
                    this.router.navigate(['/controles/list-controle']);
                    this.snackBar.open('Enregistrement réussi!', 'Confirmation', {
                        duration: 3000,
                    });
                } else {
                    this.isSubmitted = false;
                    this.snackBar.open('Echec Enregistrement!', null, {
                        duration: 3000,
                    });
                }
            },
            (err: HttpErrorResponse) => {
                this.isSubmitted = false;
                this.snackBar.open('Oups!!Une erreur s\'est produite lors de l\'enregistrement.Veuillez contacter l\'administrateur!', null, {
                    duration: 3000,
                });
            }
        );
    }

    private getChamp() {
        // const numberPatern = '^[0-9.,]+$';
        return this.fb.group({
            colonne: ['', Validators.required],
            libelle: ['', Validators.required]
            // qty: [1, [Validators.required, Validators.pattern(numberPatern)]],
            // unitPrice: ['', [Validators.required, Validators.pattern(numberPatern)]],
           //  unitTotalPrice: [{value: '', disabled: true}]
        });
    }

    // add new row
    private addChamp() {
        const control = <FormArray>this.secondFormGroup.controls['champs'];
        control.push(this.getChamp());
    }

    // remove row
    private removeChamp(i: number) {
        const control = <FormArray>this.secondFormGroup.controls['champs'];
        control.removeAt(i);
    }

}
