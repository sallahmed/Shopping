import { Component, ViewChild, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Sunshine, TypeSunshine, Entite } from '../../reportings.model';
import { ReportingsService } from '../../reportings.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NumberCardComponent } from '@swimlane/ngx-charts';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-saisie-sunshine',
  templateUrl: './saisie-sunshine.component.html',
  styleUrls: ['./saisie-sunshine.component.scss']
})
export class SaisieSunshineComponent implements OnInit {
  public form: FormGroup;
  public sunshine: Sunshine;
  isSavingError = false;
  isSubmitted = false;
  lblMessage = '';
  annees: any[];
  entites: any[];
  utilisateurs: any[];
  typeSunshines: any[];

  constructor(public router: Router, private toastr: ToastrService, public fb: FormBuilder, public reportingsService: ReportingsService) {
    this.form = this.fb.group({
      id: null,
      type_sunshine: this.fb.group({
        id: null,
        libelle: null
      }),
      entite: this.fb.group({
        id: null,
        libelle: null
      }),
      date_debut: null,
      date_fin: null,
      commentaire: null,
      mois: null,
      annee: null,
      valeur: null
    });
  }

  ngOnInit() {
    this.reportingsService.getTypeSunshines().subscribe(data => this.typeSunshines = data);
    this.reportingsService.getListEntites().subscribe(data => this.entites = data);
    this.reportingsService.getListAnneesExercice().subscribe(data => this.annees = data);
    if (this.reportingsService.selectedSunshine) {
      this.sunshine = this.reportingsService.selectedSunshine;
      this.sunshine.date_debut = new DatePipe('en-US').transform(this.sunshine.date_debut, 'yyyy-MM-dd');
      this.sunshine.date_fin = new DatePipe('en-US').transform(this.sunshine.date_fin, 'yyyy-MM-dd');
      this.form.patchValue(this.sunshine);
    } else {
      this.sunshine = new Sunshine();
      this.sunshine.type_sunshine = new TypeSunshine();
      this.sunshine.entite = new Entite();
    }
  }

  close(): void {
  }

  resetForm(form?: FormGroup) {
    if (form) {
      this.form.reset();
    }
  }

  public saveSunshine(sunshine): void {
    if (sunshine) {
      this.isSubmitted = true;
      this.reportingsService.saisieSunshine(sunshine).subscribe(
        (data: any) => {
            if (data.Succeeded === true) {
              this.isSubmitted = false;
              this.form.reset();
              this.router.navigate(['/reportings/list-sunshine']);
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
