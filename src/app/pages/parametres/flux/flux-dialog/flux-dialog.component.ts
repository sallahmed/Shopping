import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Flux } from '../../../controles/list-controle/controle.model';
import { ControlesService } from '../../../controles/list-controle/controles.service';
import {HttpErrorResponse} from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import {LoginComponent} from '../../../login/login.component';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-flux-dialog',
  templateUrl: './flux-dialog.component.html',
  styleUrls: ['./flux-dialog.component.scss']
})
export class FluxDialogComponent implements OnInit {
  public form: FormGroup;
  public passwordHide: boolean = true;
  public isSubmitted = false;

  constructor(public dialogRef: MatDialogRef<FluxDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public flux: Flux, translateService: TranslateService,
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
      if (this.flux) {
      this.form.patchValue(this.flux);
    } else {
      this.flux = new Flux();
    }
  }

  close(): void {
    this.dialogRef.close();
  }

    public addFlux(flux: any) {
        this.isSubmitted = true;
        this.controleService.addFlux(flux).subscribe((data: any) => {
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

    save(flux) {
        this.addFlux(flux);
    }


}
