import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { disk_space } from '../dashboard.data';
import { ControlesService } from '../../controles/list-controle/controles.service';

@Component({
  selector: 'app-disk-space',
  templateUrl: './disk-space.component.html'
})
export class DiskSpaceComponent implements OnInit {
  public data: any[]; public capital: any[];
  public showLegend = false;
  public gradient = true;
  public colorScheme = {
    domain: ['#2F3E9E', '#D22E2E', '#378D3B']
  };
  public showLabels = true;
  public explodeSlices = true;
  public doughnut = false;
  @ViewChild('resizedDiv') resizedDiv: ElementRef;
  // tslint:disable-next-line:no-inferrable-types
  public previousWidthOfResizedDiv: number = 0;

  constructor(public controleService: ControlesService) {
    this.controleService.getCapitalsEntites().subscribe((data: any[]) => {
      this.capital = [];
      // console.log(data);
      this.data = [];
      data.forEach((value: any, key: any) => {
        this.data.push({'name': value.entite.libelle, 'value': value.ca_global});
        this.capital.push({'name': value.entite.libelle, 'value': value.ca_global});
      });
    });
  }

  ngOnInit() {
    // this.data = disk_space;
  }

  public onSelect(event) {
    console.log(event);
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewChecked() {
    if (this.capital) {
      if (this.previousWidthOfResizedDiv !== this.resizedDiv.nativeElement.clientWidth) {
        setTimeout(() => this.data = /*[...disk_space]*/ [...this.capital] );
      }
      this.previousWidthOfResizedDiv = this.resizedDiv.nativeElement.clientWidth;
    }
  }
}
