import { Component, ViewChild, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { TypeSunshine } from '../../reportings.model';
import { ReportingsService } from '../../reportings.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NumberCardComponent } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-type-sunshine',
  templateUrl: './type-sunshine.component.html',
  styleUrls: ['./type-sunshine.component.scss']
})
export class TypeSunshineComponent implements OnInit {
  public form: FormGroup;
  public typeSunshine: TypeSunshine;
  isSavingError = false;
  isSubmitted = false;
  lblMessage = '';
  constructor(public router: Router, private toastr: ToastrService,
    public fb: FormBuilder, public reportingsService: ReportingsService) {
    this.form = this.fb.group({
      id: null,
      code: null,
      libelle: null,
      description: null
    });
  }

  ngOnInit() {
    if (this.reportingsService.selectedTypeSunshine) {
      this.typeSunshine = this.reportingsService.selectedTypeSunshine;
      this.form.patchValue(this.typeSunshine);
    } else {
      this.typeSunshine = new TypeSunshine();
    }
  }

  close(): void {
  }

  resetForm(form?: FormGroup) {
    if (form) {
      this.form.reset();
    }
  }

  public saveTypeSunshine(typeSunshine): void {
    if (typeSunshine) {
      this.isSubmitted = true;
      this.reportingsService.saisieTypeSunshine(typeSunshine).subscribe(
        (data: any) => {
            if (data.Succeeded === true) {
              this.isSubmitted = false;
              this.form.reset();
              this.router.navigate(['/reportings/list-type-sunshine']);
              this.toastr.success('Enregistrement effectué avec succès!!');
            } else {
              this.isSubmitted = false;
              this.toastr.error('Echec enregistrement!');
            }
        },
        (err: HttpErrorResponse) => {
          this.isSubmitted = false;
          this.toastr.error('Oups !!! Une erreur s\'est produite lors de l\'enregistrement.Veuillez contacter l\'administrateur!' );
        }
      );
    }
  }
}
