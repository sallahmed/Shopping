import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Dysfonctionnement } from '../../list-controle/controle.model';
import { ControlesService } from '../../list-controle/controles.service';

@Component({
  selector: 'app-detail-dysfonctionnement-dialog',
  templateUrl: './detail-dysfonctionnement-dialog.component.html',
  styleUrls: ['./detail-dysfonctionnement-dialog.component.scss']
})
export class DetailDysfonctionnementDialogComponent implements OnInit {
  public form: FormGroup;
  public passwordHide: boolean = true;

  constructor(public dialogRef: MatDialogRef<DetailDysfonctionnementDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public dysfonctionnement: Dysfonctionnement,
              public fb: FormBuilder, public controleService: ControlesService) {
  }

  ngOnInit(){
  /*
    if(this.dysfonctionnement){
      this.form.setValue(this.dysfonctionnement);
    }*/
  }

  close(): void {
    this.dialogRef.close();
  }

}
