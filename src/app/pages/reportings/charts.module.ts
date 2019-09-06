import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from '../../shared/shared.module';
import { BarComponent } from './bar/bar.component';
import { BubbleComponent } from './bubble/bubble.component';
import { LineComponent } from './line/line.component';
import { PieComponent } from './pie/pie.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ReportingComplianceComponent } from './compliance/reporting-compliance.component';
import { CompliancePorteurComponent } from './compliance-porteur/compliance-porteur.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { ReportingFinancierComponent } from './financier/reporting-financier.component';
import { ListSunshineComponent } from './sunshine/list-sunshine/list-sunshine.component';
import { ListTypeSunshineComponent } from './sunshine/list-type-sunshine/list-type-sunshine.component';
import { SaisieSunshineComponent } from './sunshine/saisie-sunshine/saisie-sunshine.component';
import { TypeSunshineComponent } from './sunshine/type-sunshine/type-sunshine.component';
import { ReportingSyntheseComponent } from './synthese/reporting-synthese.component';
import { ParamDiffusionDialogComponent } from './compliance/param-diffusion-dialog/param-diffusion-dialog.component';
import { DiffusionPorteurDialogComponent } from './compliance-porteur/diffusion-porteur-dialog/diffusion-porteur-dialog.component';
import { NgChartsModule } from './features/ng-charts.module';
import { ComboChartComponent, ComboSeriesVerticalComponent } from './combo-chart';
import { CapitalEntiteComponent } from './ca-entite/ca-entite.component';
import { SaisieCapitalEntiteComponent } from './ca-entite/saisie-ca-entite/saisie-ca-entite.component';

import { SharedLazyModule } from '../../shared/shared-lazy.module';

export const routes = [
  { path: '', redirectTo: 'bar', pathMatch: 'full'},
  { path: 'bar', component: BarComponent, data: { breadcrumb: 'Bar Charts' } },
  { path: 'pie', component: PieComponent, data: { breadcrumb: 'Pie Charts' } },
  { path: 'line', component: LineComponent, data: { breadcrumb: 'Line Charts' } },
  { path: 'bubble', component: BubbleComponent, data: { breadcrumb: 'Bubble Charts' } },
  { path: 'compliance', component: ReportingComplianceComponent, data: { breadcrumb: 'Reporting compliance' } },
  { path: 'compliance-porteur', component: CompliancePorteurComponent, data: { breadcrumb: 'Reporting compliance' } },
  { path: 'financier', component: ReportingFinancierComponent, data: { breadcrumb: 'Reporting financier' } },
  { path: 'list-sunshine', component: ListSunshineComponent, data: { breadcrumb: 'Sunshines Initiatives' } },
  { path: 'list-type-sunshine', component: ListTypeSunshineComponent, data: { breadcrumb: 'Types Sunshines' } },
  { path: 'ca-entite', component: CapitalEntiteComponent, data: { breadcrumb: 'CA Entite' } },
  { path: 'saisie-sunshine', component: SaisieSunshineComponent, data: { breadcrumb: 'Saisie Sunshine' } },
  { path: 'saisie-ca-entite', component: SaisieCapitalEntiteComponent, data: { breadcrumb: 'Saisie CA Entite' } },
  { path: 'saisie-type-sunshine', component: TypeSunshineComponent, data: { breadcrumb: 'Saisie Type Sunshine' } },
  { path: 'synthese', component: ReportingSyntheseComponent, data: { breadcrumb: 'Reporting synthese' } }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxChartsModule,
    NgxDatatableModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    NgChartsModule,
    SharedLazyModule
  ],
  declarations: [
    BarComponent,
    BubbleComponent,
    LineComponent,
    PieComponent,
    ReportingComplianceComponent,
    CompliancePorteurComponent,
    ReportingFinancierComponent,
    ListSunshineComponent,
    ListTypeSunshineComponent,
    SaisieSunshineComponent,
    TypeSunshineComponent,
    CapitalEntiteComponent,
    SaisieCapitalEntiteComponent,
    ReportingSyntheseComponent,
    ParamDiffusionDialogComponent,
    DiffusionPorteurDialogComponent,
    ComboChartComponent,
    ComboSeriesVerticalComponent
  ],
  entryComponents:[
    ParamDiffusionDialogComponent,
    DiffusionPorteurDialogComponent
  ]
})
export class ChartsModule { }