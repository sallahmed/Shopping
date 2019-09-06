import { Component, ViewChild } from '@angular/core';
import { AppSettings } from '../../../../app.settings';
import {MatDialog} from '@angular/material';
import { Settings } from '../../../../app.settings.model';
import { ControlesService } from '../../list-controle/controles.service';
import { Dysfonctionnement} from '../../list-controle/controle.model';
import { Router } from '@angular/router';
import {ModifierStatutDialogComponent} from '../../dysfonctionnement/traitement-dysfonctionnement/modifier-statut-dialog/modifier-statut-dialog.component';
import {FinExecutionDialogComponent} from '../../dysfonctionnement/traitement-dysfonctionnement/fin-execution-dialog/fin-execution-dialog.component';

@Component({
  selector: 'app-traitement-dysfonctionnement',
  templateUrl: './traitement-dysfonctionnement.component.html',
  styleUrls: ['./traitement-dysfonctionnement.component.css']
})
export class TraitementDysfonctionnementComponent {

  public settings: Settings;
  public dysfonctionnement;
  constructor(public appSettings:AppSettings, private controleService: ControlesService, public router: Router, public dialog: MatDialog) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit() {
    if(this.controleService.selectedDysfonctionnement){
      this.dysfonctionnement = this.controleService.selectedDysfonctionnement;
    }
  }

  ngAfterViewInit() {
  }

  public modifierStatut(dysfonctionnement){
    let dialogRef = this.dialog.open(ModifierStatutDialogComponent, {
      data: dysfonctionnement
    });
  }

  public terminer(dysfonctionnement) {
    //console.log(suivi.discr); //discr:"suiviRa"
  }

  public terminerExecution(dysfonctionnement){
    let dialogRef = this.dialog.open(FinExecutionDialogComponent, {
      data: dysfonctionnement
    });
  }


}
