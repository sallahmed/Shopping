import { NgModule } from '@angular/core';
import { AxisLabelComponent } from './axis-label.component';
import { XAxisComponent } from './x-axis.component';  //était commenté
//import { XAxisComponent } from '@swimlane/ngx-charts/release/common/axes/x-axis.component';
import { XAxisTicksComponent } from './x-axis-ticks.component';
import { YAxisComponent } from './y-axis.component'; //était commenté
//import { YAxisComponent } from '@swimlane/ngx-charts/release/common/axes/y-axis.component';
import { YAxisTicksComponent } from './y-axis-ticks.component';
import { CommonModule } from '@angular/common';
import { CircleSeriesComponent } from '../circle-series.component'; //ajouté
import { TooltipArea } from '../tooltip-area.component'; //AJouté

@NgModule({
  imports: [CommonModule],
  declarations: [AxisLabelComponent, XAxisComponent, XAxisTicksComponent, YAxisComponent, YAxisTicksComponent, CircleSeriesComponent, TooltipArea],
  exports: [AxisLabelComponent/*, XAxisComponent*/, XAxisTicksComponent/*, YAxisComponent*/, YAxisTicksComponent]
})
export class AxesModule {}
