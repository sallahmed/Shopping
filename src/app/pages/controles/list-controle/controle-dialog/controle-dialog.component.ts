import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Controle, TypeControle, TypeTrafic, Entite, MethodeControle } from '../controle.model';
import {  CouvertureControle, Outil, Periodicite } from '../controle.model';
import { ControlesService } from '../controles.service';

@Component({
  selector: 'app-controle-dialog',
  templateUrl: './controle-dialog.component.html',
  styleUrls: ['./controle-dialog.component.scss']
})
export class ControleDialogComponent implements OnInit {
  public form: FormGroup;
  public passwordHide: boolean = true;
  listTypeControle: any[]; listTypeTrafic: any[]; listEntite: any[]; listPeriodicite: any[];
  listMethodeControle: any[]; listOutil: any[]; listCouvertureControle: any[]; listDomaine: any[]; listPorteur: any[];

  constructor(public dialogRef: MatDialogRef<ControleDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public controle: Controle,
              public fb: FormBuilder, public controleService: ControlesService) {
    this.form = this.fb.group({
      id: null,
      reference: [null, Validators.compose([Validators.required, Validators.minLength(5)])],
      libelle: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      priorite: null,
      maturite: null,
      risque_identifie: null,
      qualification_risque: null,
      description: null,
      date_demarrage: null,
      template: null,
      type_controle: this.fb.group({
        id: null,
        libelle: null
      }),
      domaine: this.fb.group({
        id: null,
        libelle: null,
      }),
      porteur: this.fb.group({
        id: null,
        nom: null,
        prenom: null,
      }),
      type_trafic: this.fb.group({
        id: null,
        libelle: null
      }),
      entite: this.fb.group({
        id: null,
        libelle: null
      }),
      periodicite: this.fb.group({
        id: null,
        libelle: null,
        valeur: null
      }),
      methode_controle: this.fb.group({
        id: null,
        libelle: null
      }),
      outil: this.fb.group({
        id: null,
        libelle: null
      }),
      couverture_controle: this.fb.group({
        id: null,
        libelle: null
      })
    });
  }

  ngOnInit() {
      this.controleService.getListTypesControles().subscribe(data => this.listTypeControle = data);
      this.controleService.getListTypesTrafics().subscribe(data => this.listTypeTrafic = data);
      this.controleService.getListDomaines().subscribe(data => this.listDomaine = data);
      this.controleService.getListPorteurs().subscribe(data => this.listPorteur = data);
      this.controleService.getListEntites().subscribe(data => this.listEntite = data);
      this.controleService.getListPeriodicites().subscribe(data => this.listPeriodicite = data);
      this.controleService.getListMethodesControles().subscribe(data => this.listMethodeControle = data);
      this.controleService.getListOutil().subscribe(data => this.listOutil = data);
      this.controleService.getListCouvertuesControles().subscribe(data => this.listCouvertureControle = data);
      if(this.controle){
      this.form.setValue(this.controle);
    }
    else{
      this.controle = new Controle();
      this.controle.type_controle = new TypeControle();
      this.controle.type_trafic = new TypeTrafic();
      this.controle.entite = new Entite();
      this.controle.periodicite = new Periodicite();
      this.controle.methode_controle = new MethodeControle();
      this.controle.outil = new Outil();
      this.controle.couverture_controle = new CouvertureControle();
    } 
  }

  close(): void {
    this.dialogRef.close();
  }

}
