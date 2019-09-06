import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Controle, TypeControle, TypeTrafic, Entite, MethodeControle } from '../controle.model';
import {  CouvertureControle, Outil, Periodicite } from '../controle.model';
import { ControlesService } from '../controles.service';

@Component({
  selector: 'app-view-controle-dialog',
  templateUrl: './view-controle-dialog.component.html',
  styleUrls: ['./view-controle-dialog.component.scss']
})
export class ViewControleDialogComponent implements OnInit {
  public form: FormGroup;
  public passwordHide: boolean = true;

  constructor(public dialogRef: MatDialogRef<ViewControleDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public controle: Controle,
              public fb: FormBuilder, public controleService: ControlesService) {
  }

  ngOnInit() {
    /*
    if(this.controle){
      this.form.setValue(this.controle);
    }*/
  }

  close(): void {
    this.dialogRef.close();
  }

}
