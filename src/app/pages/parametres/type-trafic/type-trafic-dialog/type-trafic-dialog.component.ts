import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { TypeTrafic } from '../../../controles/list-controle/controle.model';
import { ControlesService } from '../../../controles/list-controle/controles.service';
import {TypeStructure} from '../../../users/user.model';
import {HttpErrorResponse} from '@angular/common/http';
import {LoginComponent} from '../../../login/login.component';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-type-trafic-dialog',
  templateUrl: './type-trafic-dialog.component.html',
  styleUrls: ['./type-trafic-dialog.component.scss']
})
export class TypeTraficDialogComponent implements OnInit {
  public form: FormGroup;
  public passwordHide: boolean = true;
  public isSubmitted = false;

  constructor(public dialogRef: MatDialogRef<TypeTraficDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public typeTrafic: TypeTrafic, translateService: TranslateService,
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
      if(this.typeTrafic){
      this.form.patchValue(this.typeTrafic);
    }
    else{
      this.typeTrafic = new TypeTrafic();
    } 
  }

  close(): void {
    this.dialogRef.close();
  }

    public addTypeTrafic(type: TypeTrafic) {
        this.isSubmitted = true;
        this.controleService.addTypeTrafic(type).subscribe((data: any) => {
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
        this.addTypeTrafic(type);
    }

}
