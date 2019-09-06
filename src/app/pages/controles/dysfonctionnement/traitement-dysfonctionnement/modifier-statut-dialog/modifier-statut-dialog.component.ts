import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Dysfonctionnement } from '../../../list-controle/controle.model';
import { ControlesService } from '../../../list-controle/controles.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modifier-statut-dialog',
  templateUrl: './modifier-statut-dialog.component.html',
  styleUrls: ['./modifier-statut-dialog.component.scss']
})
export class ModifierStatutDialogComponent implements OnInit {
  public form: FormGroup;
  public passwordHide: boolean = true;
  public selected = 'null';
  public  isSubmitted = false;

  constructor(public dialogRef: MatDialogRef<ModifierStatutDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public dysfonctionnement: Dysfonctionnement, public router: Router,
              public fb: FormBuilder, public controleService: ControlesService, public snackBar: MatSnackBar) {
      this.form = this.fb.group({
      id: null,
      statut: this.fb.group({
        id: [null, Validators.compose([Validators.required])],
        libelle: null,
      }),
      commentaire: null
    });


  }

  ngOnInit(){
    this.form.patchValue({id: this.dysfonctionnement.id});
  }

  close(): void {
    this.dialogRef.close();
  }

  enregistrer(obj) {
    //console.log(obj);
    this.isSubmitted = true;
    this.controleService.changeStatutDysfonctionnement(obj).subscribe((data: any) => {
            this.isSubmitted = false;
            this.form.reset();
            this.dialogRef.close();
            this.router.navigateByUrl('/controles/dysfonctionnements');
            this.snackBar.open('Enregistrement réussi!', 'Confirmation', {
                duration: 5000,
            });
        },
        (err: HttpErrorResponse) => {
            this.isSubmitted = false;
            this.snackBar.open('Oups!Un problème est survenu lors de l\'enregistrement du dysfonctionnement.', 'Echec', {
                duration: 5000,
            });
        });
  }

}
