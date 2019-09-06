import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Activite } from '../../../controles/list-controle/controle.model';
import { ControlesService } from '../../../controles/list-controle/controles.service';
import {HttpErrorResponse} from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import {LoginComponent} from '../../../login/login.component';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-activite-dialog',
  templateUrl: './activite-dialog.component.html',
  styleUrls: ['./activite-dialog.component.scss']
})
export class ActiviteDialogComponent implements OnInit {
  public form: FormGroup;
  public passwordHide: boolean = true;
  public isSubmitted = false;
  public typeControles: any[];

  constructor(public dialogRef: MatDialogRef<ActiviteDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public activite: Activite, translateService: TranslateService,
              public fb: FormBuilder, public controleService: ControlesService, public snackBar: MatSnackBar) {
    this.form = this.fb.group({
      id: null,
      libelle: [null, Validators.compose([Validators.required, Validators.minLength(5)])],
      code: null,
      type_controle: this.fb.group({
          id: [null, Validators.compose([Validators.required])],
          libelle: null,
          code: null
      }),
    });

    translateService.setDefaultLang('fr');
    translateService.setDefaultLang(LoginComponent.translation ? LoginComponent.translation.currentLang : 'fr');
  }

  ngOnInit() {
      if (this.activite) {
      this.form.patchValue(this.activite);
    } else {
      this.activite = new Activite();
    }
      this.controleService.getListTypesControles().subscribe(data => this.typeControles = data);
  }

  close(): void {
    this.dialogRef.close();
  }

    public addActivite(activite: any) {
        this.isSubmitted = true;
        this.controleService.addActivite(activite).subscribe((data: any) => {
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

    save(activite) {
        this.addActivite(activite);
    }


}
