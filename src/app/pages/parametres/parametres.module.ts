import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../../shared/shared.module';
import { PipesModule } from '../../theme/pipes/pipes.module';
import { EntitesComponent } from './entites/entites.component';
import { EntiteDialogComponent } from './entites/entite-dialog/entite-dialog.component';
import { TypeStructureComponent } from './type-structure/type-structure.component';
import { TypeStructureDialogComponent } from './type-structure/type-structure-dialog/type-structure-dialog.component';
import { PeriodiciteComponent } from './periodicite/periodicite.component';
import { PeriodiciteDialogComponent } from './periodicite/periodicite-dialog/periodicite-dialog.component';
import { TypeTraficComponent } from './type-trafic/type-trafic.component';
import { TypeTraficDialogComponent } from './type-trafic/type-trafic-dialog/type-trafic-dialog.component';
import { MethodeControleComponent } from './methode-controle/methode-controle.component';
import { MethodeControleDialogComponent } from './methode-controle/methode-controle-dialog/methode-controle-dialog.component';
import { TypeControleComponent } from './type-controle/type-controle.component';
import { TypeControleDialogComponent } from './type-controle/type-controle-dialog/type-controle-dialog.component';
import { ActiviteComponent } from './activite/activite.component';
import { ActiviteDialogComponent } from './activite/activite-dialog/activite-dialog.component';
import { FluxComponent} from './flux/flux.component';
import { FluxDialogComponent } from './flux/flux-dialog/flux-dialog.component';
import { DomaineComponent } from './domaine/domaine.component';
import { DomaineDialogComponent } from './domaine/domaine-dialog/domaine-dialog.component';
import { InfosControleComponent } from './controles/infos-controle/infos-controle.component';
import { ControlesComponent } from './controles/controles.component';
import { ControleDialogComponent } from './controles/controle-dialog/controle-dialog.component';
// import {UsersService} from './users.service';
import {AuthInterceptor} from '../../auth/auth.interceptor';
import {AuthGuard} from '../../auth/auth.guard';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import { SharedLazyModule } from '../../shared/shared-lazy.module';

export const routes = [
    { path: '', redirectTo: 'entites', pathMatch: 'full'},
    { path: 'entites', component: EntitesComponent, data: { breadcrumb: 'Entités' } },
    { path: 'types-structures', component: TypeStructureComponent, data: { breadcrumb: 'Types structures' } },
    { path: 'periodicites', component: PeriodiciteComponent, data: { breadcrumb: 'périodicités' } },
    { path: 'types-trafics', component: TypeTraficComponent, data: { breadcrumb: 'Types trafics' } },
    { path: 'methodes-controles', component: MethodeControleComponent, data: { breadcrumb: 'Méthodes de contrôle' } },
    { path: 'types-controles', component: TypeControleComponent, data: { breadcrumb: 'Types de contrôle' } },
    { path: 'controles', component: ControlesComponent, data: { breadcrumb: 'Controles' } },
    { path: 'activites', component: ActiviteComponent, data: { breadcrumb: 'Activités' } },
    { path: 'flux', component: FluxComponent, data: { breadcrumb: 'Flux' } },
    { path: 'domaine', component: DomaineComponent, data: { breadcrumb: 'Domaine' } },
    { path: 'infos-controle', component: InfosControleComponent, data: { breadcrumb: 'Contrôle' } }
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    SharedModule,
    SharedLazyModule,
    NgxDatatableModule,
    PipesModule    
  ],
  declarations: [
    EntitesComponent,
    EntiteDialogComponent,
    TypeStructureComponent,
    TypeStructureDialogComponent,
    PeriodiciteComponent,
    PeriodiciteDialogComponent,
    TypeTraficComponent,
    TypeTraficDialogComponent,
    MethodeControleComponent,
    MethodeControleDialogComponent,
    TypeControleComponent,
    TypeControleDialogComponent,
    ControlesComponent,
    ControleDialogComponent,
    ActiviteComponent,
    ActiviteDialogComponent,
    FluxComponent,
    FluxDialogComponent,
    DomaineComponent,
    DomaineDialogComponent,
    InfosControleComponent
  ],
  entryComponents:[
    EntiteDialogComponent,
    TypeStructureDialogComponent,
    TypeTraficDialogComponent,
    PeriodiciteDialogComponent,
    MethodeControleDialogComponent,
    TypeControleDialogComponent,
    ControleDialogComponent,
    ActiviteDialogComponent,
    FluxDialogComponent,
    DomaineDialogComponent
  ],
  providers: [
    // UsersService,
    AuthGuard,
    {
      provide : HTTP_INTERCEPTORS,
      useClass : AuthInterceptor,
      multi : true
    }
  ]
})
export class ParametresModule { }
