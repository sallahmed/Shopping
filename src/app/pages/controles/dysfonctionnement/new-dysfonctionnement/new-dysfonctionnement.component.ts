import { Component,ViewChild, ElementRef, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Dysfonctionnement } from '../../list-controle/controle.model';
import { ControlesService } from '../../list-controle/controles.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-new-dysfonctionnement-dialog',
  templateUrl: './new-dysfonctionnement.component.html',
  styleUrls: ['./new-dysfonctionnement.component.scss']
})
export class NewDysfonctionnementComponent implements OnInit {
  public form: FormGroup;
  public passwordHide: boolean = true;
  public listPorteurs: any[];
  public dysfonctionnement: Dysfonctionnement;
  public listControles: any[];
  isSavingError = false;
  isSubmitted = false;
  lblMessage = '';

  @ViewChild('fileInput')
      fileInput: ElementRef;

  constructor(public router: Router, private toastr: ToastrService,
              public fb: FormBuilder, public controleService: ControlesService, public snackBar: MatSnackBar) {
    this.form = this.fb.group({
      id: null,
      libelle: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      date_debut:[null, Validators.compose([Validators.required])],
      date_fin:[null, Validators.compose([Validators.required])],
      controle: this.fb.group({
        id: [null, Validators.compose([Validators.required])],
        libelle: null,
      }),
      porteur: this.fb.group({
        id: [null, Validators.compose([Validators.required])],
      })

    });
      this.controleService.getListeControles().subscribe(data => this.listControles = data);
      this.controleService.getListPorteurs().subscribe(data => this.listPorteurs = data);
  }

  ngOnInit() {
      //this.controleService.selectedControle = this.resetForm();
    if(this.controleService.selectedDysfonctionnement){
      this.dysfonctionnement = this.controleService.selectedDysfonctionnement; //On récupère le dysfonctionnnement envoyé au service
      this.form.patchValue(this.dysfonctionnement);
    }
    else{
      this.dysfonctionnement = new Dysfonctionnement();
    }
  }

  close(): void {
    //this.dialogRef.close();
  }


  resetForm(form?: FormGroup) { // ? signifie paramètre
    if (form)
      this.form.reset();
  }


  public save(dysfonctionnement):void {
    if (dysfonctionnement) {
      this.isSubmitted = true;
      this.controleService.addDysfonctionnement(dysfonctionnement).subscribe((data: any) => {
            if(data.Succeeded === true){
              this.isSubmitted = false;
              this.form.reset();
              //this.resetForm(controle);
              this.router.navigate(['/controles/dysfonctionnements']);
              //this.toastr.success('Enregistrement effectué avec succès!!');
              this.snackBar.open('Enregistrement réussi!', 'Confirmation', {
                duration: 3000,
              });
            } else {
              this.isSubmitted = false;
              //this.toastr.error('Echec enregistrement!' );
              this.snackBar.open('Echec Enregistrement!', null, {
                duration: 3000,
              });
            }
          },
          (err: HttpErrorResponse) => {
            this.isSubmitted = false;
            //this.toastr.error('Oups!!Une erreur s\'est produite lors de l\'enregistrement.Veuillez contacter l\'administrateur!' );
            this.snackBar.open('Oups!!Une erreur s\'est produite lors de l\'enregistrement.Veuillez contacter l\'administrateur!', null, {
              duration: 3000,
            });
          }
      );
    }
  }


}
