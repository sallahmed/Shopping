import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AppSettings } from '../../../app.settings';
import { Settings } from '../../../app.settings.model';
import { orders, products, customers, refunds } from '../dashboard.data';
import { ControlesService } from '../../controles/list-controle/controles.service';
import { PertesParEntite, Reporting } from '../../reportings/reportings.model';
import { ReportingsService } from '../../reportings/reportings.service';

@Component({
  selector: 'app-info-cards',
  templateUrl: './info-cards.component.html',
  styleUrls: ['./info-cards.component.scss']
})
export class InfoCardsComponent implements OnInit {
  data: any[];
  public dataReal: any[];
  public dataVal: any[];
  public tauxReal: any;
  public tauxVal: any;
  public orders: any[];
  public products: any[];
  public customers: any[];
  public refunds: any[];
  public autoScale = true;
  public pertesCA: any[];
  public sauvesCA: any[];
  public pertesParEntite: any[];
  public pertesParTypologie: any[];
  public displayedColumns = [
    'janvier', 'fevrier', 'mars', 'avril', 'mai', 'juin',
    'juillet', 'aout', 'septembre', 'octobre', 'novembre', 'decembre'
  ];
  public colorScheme = {
    domain: [
      '#999', '#2F3E9E', '#D22E2E', '#378D3B', '#0096A6', '#F47B00',
      '#606060', '#e9724d', '#d6d727', '#92cad1', '#79ccb3', '#868686'
    ]
  };
  public pertes_gains: any[];
  public multi: any[] = [
    {name: 'Cyan', series: [{name: 5, value: 2650}, {name: 10, value: 2800}, {name: 15, value: 2000}]},
    {name: 'Yellow', series: [{name: 5, value: 2500}, {name: 10, value: 3100}, {name: 15, value: 2350}]}
  ];
  public showLegend = false;
  public gradient = true;
  public showLabels = true;
  public explodeSlices = true;
  public doughnut = false;
  @ViewChild('resizedDiv') resizedDiv: ElementRef;
  public previousWidthOfResizedDiv = 0;
  public settings: Settings;
  public currentUser: any = JSON.parse(localStorage.getItem('currentUser'));
  constructor(public appSettings: AppSettings, public controleService: ControlesService, public reportingsService: ReportingsService) {
    this.settings = this.appSettings.settings;
    const idEntiteUser = this.currentUser.structure.entite.id;
    const currentTime = new Date();
    const year = currentTime.getFullYear();
    this.controleService.getPertesSauvesCA(idEntiteUser).subscribe((pertesSauves: any[]) => {
      this.pertesCA = []; const pertes = pertesSauves['pertesCA'];
      this.sauvesCA = []; const sauves = pertesSauves['sauvesCA'];
      pertes.forEach((value: any, key: any) => {
        this.pertesCA.push({ 'name': this.displayedColumns[key], 'value': value });
      });
      sauves.forEach((value: any, key: any) => {
        this.sauvesCA.push({ 'name': this.displayedColumns[key], 'value': value });
      });
    });

    this.reportingsService.getReportingsFinancierEntity(idEntiteUser, year).subscribe((pertesParTypo: Reporting[]) => {
      this.pertesParTypologie = [];
      this.pertes_gains = [];
      const pourc_pertes = [];
      const pourc_sauves = [];
      pertesParTypo.forEach((value: any, key: any) => {
        const controles = value.controles;
        controles.forEach((val: any) => {
          this.pertesParTypologie.push({'name': val.label_loss_tc, 'value': val.loss_tc_annuel});
        });
        value.pourc_loss.forEach((v1: any, k1: any) => {
          pourc_pertes.push({'name': this.displayedColumns[k1], 'value': v1});
        });
        value.pourc_save.forEach((v2: any, k2: any) => {
          pourc_sauves.push({'name': this.displayedColumns[k2], 'value': v2});
        });
        this.pertes_gains.push({name: 'Pertes', series: pourc_pertes});
        this.pertes_gains.push({name: 'Sauves', series: pourc_sauves});
      });
    });

    this.reportingsService.getPertesParEntite(year).subscribe((pertesEntite: PertesParEntite[]) => {
      this.pertesParEntite = [];
      const pertes = pertesEntite['pertes'];
      pertes.forEach((value: any, key: any) => {
        this.pertesParEntite.push({'name': value.name, 'value': Number(value.value).toFixed(2)});
       });
    });
    this.controleService.getDataCompliance(null).subscribe((data: any[]) => {
      this.dataReal = []; this.dataVal = []; this.tauxReal = this.tauxVal = 0;
      this.data = data ;
      const d = new Date();
      const n = d.getMonth();
      let t1 = 1; let t2 = 1;
      data.forEach((value: any, key: any) => {
        const date = new Date(value.date);
        this.dataReal.push({'name': this.displayedColumns[key], 'value': value.pourcentageRealisation});
        this.dataVal.push({'name': this.displayedColumns[key], 'value': value.pourcentageValorisation});
        if (key <= n) {
          t1 += parseFloat(this.data[key].pourcentageRealisation);
          t2 += parseFloat(this.data[key].pourcentageValorisation);
        }
      });
      // tslint:disable-next-line:radix
      this.tauxReal = t1 / parseInt(this.data[n].nbreControles);
      // tslint:disable-next-line:radix
      this.tauxVal = t2 / parseInt(this.data[n].nbreControles);
      // a=parseFloat(Math.round(58.8965896589*10^2)/10^2); Arondir, avec deux chiffres après la virgule
    });
  }

  ngOnInit() {
    this.orders = orders;
    this.products = products;
    this.customers = customers;
    this.refunds = refunds;
    this.orders = this.addRandomValue('orders');
    this.customers = this.addRandomValue('customers');
  }

  public onSelect(event) {
    // console.log(event);
  }

  public addRandomValue(param) {
    switch (param) {
      case 'orders':
        for (let i = 1; i < 30; i++) {
          this.orders[0].series.push({'name': 1980 + i, 'value': Math.ceil(Math.random() * 1000000)});
        }
        return this.orders;
      case 'customers':
        for (let i = 1; i < 15; i++) {
          this.customers[0].series.push({'name': 2000 + i, 'value': Math.ceil(Math.random() * 1000000)});
        }
        return this.customers;
      default:
        return this.orders;
    }
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy () {
    this.orders[0].series.length = 0;
    this.customers[0].series.length = 0;
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewChecked() {
    if (this.previousWidthOfResizedDiv !== this.resizedDiv.nativeElement.clientWidth) {
      setTimeout(() => this.orders = [...orders] );
      setTimeout(() => this.products = [...products] );
      setTimeout(() => this.customers = [...customers] );
      setTimeout(() => this.refunds = [...refunds] );
    }
    this.previousWidthOfResizedDiv = this.resizedDiv.nativeElement.clientWidth;
  }

}
