import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Domaine } from '../../../controles/list-controle/controle.model';
import { ControlesService } from '../../../controles/list-controle/controles.service';
import {HttpErrorResponse} from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import {LoginComponent} from '../../../login/login.component';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-domaine-dialog',
  templateUrl: './domaine-dialog.component.html',
  styleUrls: ['./domaine-dialog.component.scss']
})
export class DomaineDialogComponent implements OnInit {
  public form: FormGroup;
  public passwordHide: boolean = true;
  public isSubmitted = false;
  public domaines = [];

  constructor(public dialogRef: MatDialogRef<DomaineDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public domaine: Domaine, translateService: TranslateService,
              public fb: FormBuilder, public controleService: ControlesService, public snackBar: MatSnackBar) {
    this.form = this.fb.group({
      id: null,
      libelle: [null, Validators.compose([Validators.required, Validators.minLength(5)])],
      code: null,
      parent: this.fb.group({
      id: null,
      libelle: null
      })
    });

      this.controleService.getListDomaines().subscribe(data => {
          this.domaines = data;
      });

    translateService.setDefaultLang('fr');
    translateService.setDefaultLang(LoginComponent.translation ? LoginComponent.translation.currentLang : 'fr');
  }

  ngOnInit() {
      if (this.domaine) {
      this.form.patchValue(this.domaine);
    } else {
      this.domaine = new Domaine();
    }
  }

  close(): void {
    this.dialogRef.close();
  }

    public addDomaine(domaine: any) {
        this.isSubmitted = true;
        this.controleService.addDomaine(domaine).subscribe((data: any) => {
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

    save(domaine) {
        this.addDomaine(domaine);
    }


}
