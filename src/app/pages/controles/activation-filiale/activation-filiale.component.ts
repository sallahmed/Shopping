import { Component,ViewChild, ElementRef, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Dysfonctionnement } from '../list-controle/controle.model';
import { ControlesService } from '../list-controle/controles.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-activation-filiale-dialog',
  templateUrl: './activation-filiale.component.html',
  styleUrls: ['./activation-filiale.component.scss']
})
export class ActivationFilialeComponent implements OnInit {
  public form: FormGroup;
  isSubmitted = false;
  public entites: any[]; public controle;
  entries = [];
  selectedEntry;

  constructor(public router: Router, private toastr: ToastrService,
              public fb: FormBuilder, public controleService: ControlesService, public snackBar: MatSnackBar) {
    this.form = this.fb.group({
      entite: this.fb.group({
        id: [null, Validators.compose([Validators.required])],
        libelle: null,
        code: null,
        controle: null
      })
    });
  }

  ngOnInit() {
    if(this.controleService.selectedControle){
      this.controle = this.controleService.selectedControle;
    }
    this.controleService.getListEntites().subscribe(data => this.entites = data);
  }


  resetForm(form?: FormGroup) { // ? signifie paramètre
    if (form)
      this.form.reset();
  }


  public save(controle):void {

  }

  onSettingChanged(setting, $event){}
  close(){}

}
