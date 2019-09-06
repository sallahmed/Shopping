import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Entite } from '../../../controles/list-controle/controle.model';
import { ControlesService } from '../../../controles/list-controle/controles.service';
import {User} from '../../../users/user.model';
import {HttpErrorResponse} from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import {MethodeControle} from '../../../reportings/reportings.model';
import {LoginComponent} from '../../../login/login.component';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-entite-dialog',
  templateUrl: './entite-dialog.component.html',
  styleUrls: ['./entite-dialog.component.scss']
})
export class EntiteDialogComponent implements OnInit {
  public form: FormGroup;
  public passwordHide: boolean = true;
  public isSubmitted = false;

  constructor(public dialogRef: MatDialogRef<EntiteDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public entite: Entite, translateService: TranslateService,
              public fb: FormBuilder, public controleService: ControlesService, public snackBar: MatSnackBar) {
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
      if (this.entite) {
      this.form.patchValue(this.entite);
    } else {
      this.entite = new Entite();
    }
  }

  close(): void {
    this.dialogRef.close();
  }

    public addEntite(entite: any) {
        this.isSubmitted = true;
        this.controleService.addEntite(entite).subscribe((data: any) => {
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

    save(entite) {
        this.addEntite(entite);
    }


}
