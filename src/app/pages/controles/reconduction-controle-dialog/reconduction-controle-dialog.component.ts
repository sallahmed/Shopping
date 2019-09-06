import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Dysfonctionnement } from '../list-controle/controle.model';
import { ControlesService } from '../list-controle/controles.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-reconduction-controle-dialog',
  templateUrl: './reconduction-controle-dialog.component.html',
  styleUrls: ['./reconduction-controle-dialog.component.scss']
})
export class ReconductionControleDialogComponent implements OnInit {
  public form: FormGroup;
  isSubmitted = false;
  public entites: any[]; public controle; public annees: any[] = [];
  entries = [];
  selectedEntry;

  constructor(public router: Router, private toastr: ToastrService, public dialogRef: MatDialogRef<ReconductionControleDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public controleFiliale: any,
              public fb: FormBuilder, public controleService: ControlesService, public snackBar: MatSnackBar) {
    this.form = this.fb.group({
      annee: this.fb.group({
        id: null,
        value: [null, Validators.compose([Validators.required])],
      }),
      commentaire: null,
      controleFiliale: null
    });
    this.populateYears();
    if(this.controleFiliale)
        this.form.patchValue({controleFiliale: this.controleFiliale.id});
  }

  ngOnInit() {
    if(this.controleService.selectedControle){
      this.controle = this.controleService.selectedControle;
    }
    this.controleService.getListEntites().subscribe(data => this.entites = data);
  }


  resetForm(form?: FormGroup) { // ? signifie paramètre
    if (form)
      this.form.reset();
  }


  public save(myData): void {
      this.isSubmitted = true;
      this.controleService.reconduire(myData).subscribe((data: any) => {
              this.isSubmitted = false;
              this.dialogRef.close();
              this.router.navigateByUrl('/controles/details-controle');
              this.snackBar.open('Reconduction effectuée avec succès!', 'Confirmation', {
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

  onSettingChanged(setting, $event){}

  populateYears() {
      let yearSelect = document.querySelector('#year');
      // On obtient l'année courante
      let date = new Date();
      let year = date.getFullYear();

      // On affiche l'année courante et les 100 années
      // précédentes pour l'élément <select> destiné à
      // stocker l'année
      this.annees = [];
      for (let i = 0; i <= 10; i++) {
          let annee = year - i;
          this.annees.push({'id': i, 'value': annee});
      }
      this.controleFiliale.objectif_controle.forEach( (value: any, index: number) => {
         this.annees = this.annees.filter(e => e.value !== value.annee);
      });
  }

  close(){}
}
