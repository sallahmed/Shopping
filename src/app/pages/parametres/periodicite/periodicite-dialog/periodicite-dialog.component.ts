import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Entite, Periodicite} from '../../../controles/list-controle/controle.model';
import { ControlesService } from '../../../controles/list-controle/controles.service';
import {HttpErrorResponse} from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-periodicite-dialog',
  templateUrl: './periodicite-dialog.component.html',
  styleUrls: ['./periodicite-dialog.component.scss']
})
export class PeriodiciteDialogComponent implements OnInit {
  public form: FormGroup;
  public passwordHide: boolean = true;
  public isSubmitted = false;

  constructor(public dialogRef: MatDialogRef<PeriodiciteDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public periodicite: Periodicite, private snackBar: MatSnackBar,
              public fb: FormBuilder, public controleService: ControlesService) {
    this.form = this.fb.group({
      id: null,
      libelle: [null, Validators.compose([Validators.required, Validators.minLength(5)])],
      code: null,
      valeur: [null, Validators.compose([Validators.required])]
    });
  }

  ngOnInit() {
      // this.controleService.getListTypesControles().subscribe(data => this.listTypeControle = data);
      if(this.periodicite){
      this.form.patchValue(this.periodicite);
    }
    else{
      this.periodicite = new Periodicite();
    } 
  }

  close(): void {
    this.dialogRef.close();
  }

    public addPeriodicite(periodicite: Periodicite) {
        this.isSubmitted = true;
        this.controleService.addPeriodicite(periodicite).subscribe((data: any) => {
                this.isSubmitted = false;
                this.dialogRef.close();
                this.snackBar.open('Enregistrement réussi!', 'Confirmation', {
                    duration: 5000,
                });
            },
            (err: HttpErrorResponse) => {
                this.isSubmitted = false;
                this.snackBar.open('Oups!!Une erreur s\'est produite lors de l\'enregistrement.Veuillez contacter l\'administrateur!', null, {
                    duration: 5000,
                });
            }
        );
    }

    save(periodicite) {
        this.addPeriodicite(periodicite);
    }


}
