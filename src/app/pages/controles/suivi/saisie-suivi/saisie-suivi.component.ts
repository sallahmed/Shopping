import { Component,ViewChild, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {FormGroup, FormBuilder, Validators, FormArray} from '@angular/forms';
import { Controle, Suivi } from '../../list-controle/controle.model';
import { ControlesService } from '../../list-controle/controles.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NumberCardComponent } from '../../../../../../node_modules/@swimlane/ngx-charts';

@Component({
  selector: 'app-saisie-suivi',
  templateUrl: './saisie-suivi.component.html',
  styleUrls: ['./saisie-suivi.component.scss']
})
export class SaisieSuiviComponent implements OnInit {
  public form: FormGroup;
  public controleFiliale: Controle|any;
  public suivi: Suivi|any;
  isSavingError = false;
  isSubmitted = false;
  lblMessage = '';
  typologiesPertes: any[];
  public modele: any[];
  public champsSup = [];

  constructor(/*public dialogRef: MatDialogRef<NewControleComponent>,
              @Inject(MAT_DIALOG_DATA) public controle: Controle,*/
              public router: Router, private toastr: ToastrService,
              public fb: FormBuilder, public controleService: ControlesService) {
      if(localStorage.getItem('selectedControleFiliale')) {
          this.controleFiliale = JSON.parse(localStorage.getItem('selectedControleFiliale'));
      }
      this.modele = Object.keys(this.controleFiliale.controle.modele).map(key => ({colonne: key, libelle: this.controleFiliale.controle.modele[key]}));
      //this.form = this.createGroup(); // On appelle la fonction qui crée les formcontrol
      this.form = this.fb.group({
      id: null,
      //total_hlr: [null, Validators.compose([Validators.required])],
      //nbre_not_camel: null,
      //nbre_imsi_prepaid: null,
      //vlm_ecat: null,
      correction: null,
      //date_correction: null,
      //volume: null,
      revenu_sauve: null,
      typologie_perte: this.fb.group({
          id: [null, Validators.compose([Validators.required])],
          libelle: null
      }),
      perte: null,
      risque_pertes: null,
      recouvrement: null,
      pertes_stop: null,
      // complement: this.fb.group([this.getChampSup()]),
      extras: this.fb.group([]),
    });
      this.getChampSup(); // AJout des controls dans complement
  }

  ngOnInit() {
    this.controleService.getTypologiePertes().subscribe(data => this.typologiesPertes = data);
    if(this.controleService.selectedSuivi){
      this.suivi = this.controleService.selectedSuivi; //On récupère le controle envoyé au service
        //this.form.get('id').setValue(this.suivi.id);
        this.form.patchValue(this.suivi); //patch évite les erreurs que crée setValue
    }
      /*this.modele.forEach((val, key) => {
          console.log(key);
          console.log(val);
      });*/

  }

    private getChampSup() {
        const formulaire = <FormGroup>this.form.get('extras');
        for(let i=7; i<this.modele.length;i++){
          formulaire.addControl(this.modele[i].colonne, this.fb.control(''));
        }
        return this.champsSup;

    }

    createGroup() { // Ajout des control dynamiques
        const group = this.form = this.fb.group({
            id: null,
            revenu_sauve: null,
            typologie_perte: [null, Validators.compose([Validators.required])],
            perte: null,
            risque_perte: null,
            recouvrement: null,
            pertes_stop: null
        });
        this.modele.slice(7).forEach(champ => group.addControl(champ.colonne, this.fb.control('')));
        return group;
    }

  close(): void {
    //this.dialogRef.close();
  }


  resetForm(form?: FormGroup) { // ? signifie param�tre
    if (form)
      this.form.reset();
  }


  public save(suivi):void {
    if (suivi) {
      this.isSubmitted = true;
      //console.log(JSON.parse(localStorage.getItem('selectedControle')).id);
      let id = JSON.parse(localStorage.getItem('selectedControleFiliale')).id;
      this.controleService.saisieSuivi(suivi).subscribe((data: any) => {
            if(data.Succeeded === true){
              this.controleService.getControleFilialeById(id).subscribe((data: Controle) => {
                this.controleFiliale = data;
                this.controleService.selectedControleFiliale = this.controleFiliale;
                localStorage.setItem('selectedControleFiliale', JSON.stringify(this.controleFiliale));
                this.isSubmitted = false;
                this.form.reset();
                this.router.navigate(['/controles/details-controle']);
                this.toastr.success('Enregistrement effectué avec succès!!');
              });
            } else {
              this.isSubmitted = false;
              this.toastr.error('Echec enregistrement!' );
            }
      },
      (err: HttpErrorResponse) => {
        this.isSubmitted = false;
        //console.log(err.ok); console.log(err.status);
        this.toastr.error('Oups!!Une erreur s\'est produite lors de l\'enregistrement.Veuillez contacter l\'administrateur!' );
      }
      );
    }
  }

}
