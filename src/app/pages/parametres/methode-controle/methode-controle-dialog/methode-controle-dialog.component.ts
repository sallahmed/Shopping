import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Entite, MethodeControle} from '../../../controles/list-controle/controle.model';
import { ControlesService } from '../../../controles/list-controle/controles.service';
import {HttpErrorResponse} from '@angular/common/http';
import {LoginComponent} from '../../../login/login.component';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-methode-controle-dialog',
  templateUrl: './methode-controle-dialog.component.html',
  styleUrls: ['./methode-controle-dialog.component.scss']
})
export class MethodeControleDialogComponent implements OnInit {
  public form: FormGroup;
  public passwordHide: boolean = true;
  public isSubmitted = false;

  constructor(public dialogRef: MatDialogRef<MethodeControleDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public methodeControle: MethodeControle, private snackBar: MatSnackBar,
              public fb: FormBuilder, public controleService: ControlesService, translateService: TranslateService) {
    this.form = this.fb.group({
      id: null,
      libelle: [null, Validators.compose([Validators.required, Validators.minLength(5)])],
      code: null
    });

    translateService.setDefaultLang('fr');
    translateService.setDefaultLang(LoginComponent.translation ? LoginComponent.translation.currentLang : 'fr');
  }

  ngOnInit() {
      // this.controleService.getListTypesControles().subscribe(data => this.listTypeControle = data);
      if(this.methodeControle){
      this.form.patchValue(this.methodeControle);
    }
    else{
      this.methodeControle = new MethodeControle();
    }
  }

  close(): void {
    this.dialogRef.close();
  }

    public addMethodeControle(methode: MethodeControle) {
        this.isSubmitted = true;
        this.controleService.addMethodeControle(methode).subscribe((data: any) => {
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

    save(methode) {
        this.addMethodeControle(methode);
    }

}
