import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Dysfonctionnement } from '../../../list-controle/controle.model';
import { ControlesService } from '../../../list-controle/controles.service';

@Component({
  selector: 'app-fin-execution-dialog',
  templateUrl: './fin-execution-dialog.component.html',
  styleUrls: ['./fin-execution-dialog.component.scss']
})
export class FinExecutionDialogComponent implements OnInit {
  public form: FormGroup;
  public passwordHide: boolean = true;
  public selected = 'null';

  constructor(public dialogRef: MatDialogRef<FinExecutionDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public dysfonctionnement: Dysfonctionnement,
              public fb: FormBuilder, public controleService: ControlesService) {
    this.form = this.fb.group({
        date: [null, Validators.compose([Validators.required])],
        commentaire: null,
    });

  }

  ngOnInit(){
  }

  close(): void {
    this.dialogRef.close();
  }

}
