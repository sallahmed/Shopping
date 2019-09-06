import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { TypeStructure } from '../../../users/user.model';
import {HttpErrorResponse} from '@angular/common/http';
import {Entite} from '../../../controles/list-controle/controle.model';
import {ControlesService} from '../../../controles/list-controle/controles.service';

@Component({
  selector: 'app-type-structure-dialog',
  templateUrl: './type-structure-dialog.component.html',
  styleUrls: ['./type-structure-dialog.component.scss']
})
export class TypeStructureDialogComponent implements OnInit {
  public form: FormGroup;
  public passwordHide: boolean = true;
  public isSubmitted = false;

  constructor(public dialogRef: MatDialogRef<TypeStructureDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public typeStructure: TypeStructure,
              public fb: FormBuilder, public controleService: ControlesService, public snackBar: MatSnackBar) {
    this.form = this.fb.group({
      id: null,
      libelle: [null, Validators.compose([Validators.required, Validators.minLength(5)])],
      code: null
    });
  }

  ngOnInit() {
      // this.controleService.getListTypesControles().subscribe(data => this.listTypeControle = data);
      if(this.typeStructure){
      this.form.patchValue(this.typeStructure);
    }
    else{
      this.typeStructure = new TypeStructure();
    } 
  }

  close(): void {
    this.dialogRef.close();
  }

    public addTypeStructure(type: TypeStructure) {
        this.isSubmitted = true;
        this.controleService.addTypeStructure(type).subscribe((data: any) => {
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
        this.addTypeStructure(type);
    }

}
