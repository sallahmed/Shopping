import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from '../../shared/shared.module';
import { BasicComponent } from './basic/basic.component';
import { PagingComponent } from './paging/paging.component';
import { SortingComponent } from './sorting/sorting.component';
import { FilteringComponent } from './filtering/filtering.component';
import { ListControleComponent } from './list-controle/list-controle.component';
import { TablesService } from './tables.service';
import {ControleDialogComponent} from './list-controle/controle-dialog/controle-dialog.component';
import { PorteurDialogComponent } from './list-controle/porteur-dialog/porteur-dialog.component';
import {NewControleComponent} from './list-controle/new-controle/new-controle.component';
import {ViewControleDialogComponent} from './list-controle/view-controle-dialog/view-controle-dialog.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DetailsControleComponent } from './list-controle/details-controle/details-controle.component';
import { MesControlesComponent } from './mes-controles/mes-controles.component';
import { SaisieSuiviComponent } from './suivi/saisie-suivi/saisie-suivi.component';
import { ListSuiviComponent } from './suivi/list-suivi/list-suivi.component';
import { DysfonctionnementComponent } from './dysfonctionnement/dysfonctionnement.component';
import { NewDysfonctionnementComponent } from './dysfonctionnement/new-dysfonctionnement/new-dysfonctionnement.component';
import {DetailDysfonctionnementDialogComponent} from './dysfonctionnement/detail-dysfonctionnement-dialog/detail-dysfonctionnement-dialog.component';
import {ModifierStatutDialogComponent} from './dysfonctionnement/traitement-dysfonctionnement/modifier-statut-dialog/modifier-statut-dialog.component';
import {FinExecutionDialogComponent} from './dysfonctionnement/traitement-dysfonctionnement/fin-execution-dialog/fin-execution-dialog.component';
import {ChoixPeriodiciteDialogComponent} from './chargement-masse/choix-periodicite-dialog/choix-periodicite-dialog.component';
import {TraitementDysfonctionnementComponent} from './dysfonctionnement/traitement-dysfonctionnement/traitement-dysfonctionnement.component';
import { ActivationFilialeComponent } from './activation-filiale/activation-filiale.component';
import { ConfigModeleComponent } from './config-modele/config-modele.component';
import { EvaluationMaturiteComponent } from './evaluation-maturite/evaluation-maturite.component';
import { ReconductionControleDialogComponent } from './reconduction-controle-dialog/reconduction-controle-dialog.component';
import { ExcludePipe } from './pipe/exclude.pipe';
// import {ExpandMode, NgxTreeSelectModule} from 'ngx-tree-select';
import { SharedLazyModule } from '../../shared/shared-lazy.module';

import { SuiviService } from './list-controle/details-controle/suivi.service';

export const routes = [
  { path: '', redirectTo: 'list-controle', pathMatch: 'full'},
  { path: 'basic', component: BasicComponent, data: { breadcrumb: 'Basic table' } },
  { path: 'paging', component: PagingComponent, data: { breadcrumb: 'Paging table' } },
  { path: 'sorting', component: SortingComponent, data: { breadcrumb: 'Sorting table' } },
  { path: 'filtering', component: FilteringComponent, data: { breadcrumb: 'Filtering table' } },
  { path: 'list-controle', component: ListControleComponent, data: { breadcrumb: 'Liste des contrôles' } },
  { path: 'mes-controles', component: MesControlesComponent, data: { breadcrumb: 'Liste des contrôles' } },
  { path: 'new-controle', component: NewControleComponent, data: { breadcrumb: 'Nouveau contrôle' } },
  { path: 'details-controle', component: DetailsControleComponent, data: { breadcrumb: 'Détails du contrôle' } },
  { path: 'saisie-suivi', component: SaisieSuiviComponent, data: { breadcrumb: 'Saisie du suivi' } },
  { path: 'list-suivis', component: ListSuiviComponent, data: { breadcrumb: 'Liste des suivis' } },
  { path: 'dysfonctionnements', component: DysfonctionnementComponent, data: { breadcrumb: 'Les dysfonctionnements' } },
  { path: 'new-dysfonctionnement', component: NewDysfonctionnementComponent, data: { breadcrumb: 'Dysfonctionnement' } },
  { path: 'activation-filiale', component: ActivationFilialeComponent, data: { breadcrumb: 'Liste des contrôles' } },
  { path: 'config-modele', component: ConfigModeleComponent, data: { breadcrumb: 'Paramétrage de modèle' } },
  { path: 'evaluation-maturite', component: EvaluationMaturiteComponent, data: { breadcrumb: 'Evaluation des contrôles' } },
  { path: 'traitement-dysfonctionnement', component: TraitementDysfonctionnementComponent, data: { breadcrumb: 'Traitement dysfonctionnement' } }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxDatatableModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    SharedLazyModule
    /*NgxTreeSelectModule.forRoot({
        //allowFilter: true,
        //filterPlaceholder: 'Type your filter here...',
        //maxVisibleItemCount: 5,
        idField: 'id',
        textField: 'libelle',
        //childrenField: 'children',
        //allowParentSelection: true,
        expandMode: 'Selection'
    })*/
  ],
  declarations: [
    BasicComponent, 
    PagingComponent, 
    SortingComponent, 
    FilteringComponent, 
    ListControleComponent,
    ControleDialogComponent,
    PorteurDialogComponent,
    ViewControleDialogComponent,
    NewControleComponent,
    DetailsControleComponent,
    MesControlesComponent,
    SaisieSuiviComponent,
    ListSuiviComponent,
    DysfonctionnementComponent,
    NewDysfonctionnementComponent,
    DetailDysfonctionnementDialogComponent,
    ModifierStatutDialogComponent,
    FinExecutionDialogComponent,
    ChoixPeriodiciteDialogComponent,
    TraitementDysfonctionnementComponent,
    ActivationFilialeComponent,
    ConfigModeleComponent,
    ExcludePipe,
    ActivationFilialeComponent,
    EvaluationMaturiteComponent,
    ReconductionControleDialogComponent
  ],
  entryComponents:[
    ControleDialogComponent,
    PorteurDialogComponent,
    ViewControleDialogComponent,
    ModifierStatutDialogComponent,
    FinExecutionDialogComponent,
    ChoixPeriodiciteDialogComponent,
    DetailDysfonctionnementDialogComponent,
    ReconductionControleDialogComponent
  ],
  providers: [
    TablesService,
    SuiviService
  ]
})
export class TablesModule { }
