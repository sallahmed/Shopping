import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import {TypeControle, TypeTrafic} from '../../../controles/list-controle/controle.model';
import { ControlesService } from '../../../controles/list-controle/controles.service';
import {HttpErrorResponse} from '@angular/common/http';
import {LoginComponent} from '../../../login/login.component';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-type-Controle-dialog',
  templateUrl: './type-controle-dialog.component.html',
  styleUrls: ['./type-controle-dialog.component.scss']
})
export class TypeControleDialogComponent implements OnInit {
  public form: FormGroup;
  public passwordHide: boolean = true;
  public isSubmitted = false;

  constructor(public dialogRef: MatDialogRef<TypeControleDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public typeControle: TypeControle, private snackBar: MatSnackBar,
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
      if(this.typeControle){
      this.form.patchValue(this.typeControle);
    }
    else{
      this.typeControle = new TypeControle();
    } 
  }

  close(): void {
    this.dialogRef.close();
  }

    public addTypeControle(type: TypeControle) {
        this.isSubmitted = true;
        this.controleService.addTypeControle(type).subscribe((data: any) => {
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

    save(type) {
        this.addTypeControle(type);
    }

}
