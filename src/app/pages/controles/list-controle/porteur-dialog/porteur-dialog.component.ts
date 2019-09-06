import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import {  Controle } from '../../../controles/list-controle/controle.model';
import { ControlesService } from '../../../controles/list-controle/controles.service';
import {  HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import {LoginComponent} from '../../../login/login.component';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-porteur-dialog',
  templateUrl: './porteur-dialog.component.html',
  styleUrls: ['./porteur-dialog.component.scss']
})
export class PorteurDialogComponent implements OnInit {
  public form: FormGroup;
  public passwordHide: boolean = true;
  listPorteur: any[];
  listEntites: any[];
  public isSubmitted = false;

  constructor(public dialogRef: MatDialogRef<PorteurDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public controleFiliale: any, public snackBar: MatSnackBar, translateService: TranslateService,
              public fb: FormBuilder, public controleService: ControlesService, public router: Router) {
    this.form = this.fb.group({
      id: null,
      porteur: this.fb.group({
        id: [null, Validators.compose([Validators.required])],
        nom: null,
        prenom: null,
      })
    });
      this.controleService.getListPorteurs().subscribe(data => this.listPorteur = data);
      if (this.controleFiliale) {
          this.form.patchValue({id: this.controleFiliale.id});
      }

    translateService.setDefaultLang('fr');
    translateService.setDefaultLang(LoginComponent.translation ? LoginComponent.translation.currentLang : 'fr');
  }

  ngOnInit() {}

  close(): void {
    this.dialogRef.close();
  }

  enregistrer(myData) {
      this.isSubmitted = true;
         this.controleService.editPorteurControle(myData).subscribe((data: any) => {
                 this.isSubmitted = false;
                 this.dialogRef.close();
                 this.router.navigateByUrl('/controles/list-controle');
                 this.snackBar.open('Opération effectuée avec succès!', 'Confirmation', {
                     duration: 5000,
                 });
             },
             (err: HttpErrorResponse) => {
                 this.isSubmitted = false;
                 this.snackBar.open('Oups!Un problème est survenu lors de cette opération.', 'Echec', {
                     duration: 5000,
                 });
             });
  }

}
