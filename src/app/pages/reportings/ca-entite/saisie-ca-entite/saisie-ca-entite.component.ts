import { Component, ViewChild, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Capital, Entite, Domaine } from '../../reportings.model';
import { ReportingsService } from '../../reportings.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NumberCardComponent } from '@swimlane/ngx-charts';
import { ControlesService } from '../../../controles/list-controle/controles.service';

@Component({
  selector: 'app-saisie-ca-entite',
  templateUrl: './saisie-ca-entite.component.html',
  styleUrls: ['./saisie-ca-entite.component.scss']
})
export class SaisieCapitalEntiteComponent implements OnInit {
  public form: FormGroup;
  public capital: Capital;
  typeCA: any;
  isSavingError = false;
  isSubmitted = false;
  lblMessage = '';
  annees: any[];
  entites: any[];
  domaines: any[];

  constructor(public router: Router, private toastr: ToastrService, public fb: FormBuilder,
    public reportingsService: ReportingsService, public controlesService: ControlesService ) {
    this.form = this.fb.group({
      id: null,
      ca_global: null,
      entite: this.fb.group({
        id: null,
        libelle: null
      }),
      domaine: this.fb.group({
        id: null,
        libelle: null
      }),
      mois: null,
      annee: null
    });
  }

  ngOnInit() {
    this.reportingsService.getListEntites().subscribe(data => this.entites = data);
    this.reportingsService.getListAnneesExercice().subscribe(data => this.annees = data);
    this.controlesService.getListDomaines().subscribe(data => this.domaines = data);
    this.typeCA = this.reportingsService.typeCA;
    if (this.reportingsService.selectedCapital) {
      this.capital = this.reportingsService.selectedCapital;
      this.form.patchValue(this.capital);
    } else {
      this.capital = new Capital();
      this.capital.entite = new Entite();
      this.capital.domaine = new Domaine();
    }
  }

  close(): void {
  }

  resetForm(form?: FormGroup) {
    if (form) {
      this.form.reset();
    }
  }

  public saveCapital(capital): void {
    if (capital) {
      this.isSubmitted = true;
      this.reportingsService.saisieCapital(capital).subscribe(
        (data: any) => {
            if (data.Succeeded === true) {
              this.isSubmitted = false;
              this.form.reset();
              this.router.navigate(['/reportings/ca-entite']);
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
