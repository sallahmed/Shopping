import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { AppSettings } from '../../../../app.settings';
import { Settings } from '../../../../app.settings.model';
import {MatDialog} from '@angular/material';
import { ControlesService} from '../../../controles/list-controle/controles.service';
import { Controle } from '../../../controles/list-controle/controle.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details-controle',
  templateUrl: './infos-controle.component.html',
  styleUrls: ['./infos-controle.component.css']
})
export class InfosControleComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public displayedColumns = [
    'jour',
    'risques_pertes_revenus',
    'pertes',
    'typologie_pertes',
    'revenu_sauves',
    'actions'
  ];
  loadingIndicator: boolean = true;
  currentTemplate: File = null;
  public dataSource: any;
  public settings: Settings;
  public  controle: Controle|any; public mois: string; public year: number;
  public oc: any; public annees: any[] = []; public selectedYear: number;
  public month: string[] = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre", ];
  constructor(public appSettings: AppSettings,
              private controleService: ControlesService, public router: Router, public dialog: MatDialog) {
    this.settings = this.appSettings.settings;
    var currentTime = new Date();
  }

  ngOnInit() {
    if(this.controleService.selectedControle){
      this.controle = this.controleService.selectedControle;
    }
  }

  ngAfterViewInit() {
  }


  downloadFile(controle: any): void {
    let byteArray = new Uint8Array(controle.template.blob);
    console.log(byteArray);
    const blob: Blob = new Blob([controle.template.blob], {type: 'application/binary'});
    const file = new File([blob], controle.template.filename, { type: controle.template.filetype });
    const fileName: string = controle.template.filename;
    const objectUrl: string = controle.template.path;

     var reader = new FileReader();
    reader.readAsDataURL(blob); // Convertir blob en base64
    // reader.readAsArrayBuffer( controle.template.blob); //Convertir blob en buffer
    reader.onloadend = function(event) {
      var base64data = reader.result;
    }

    const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;
    a.href = objectUrl;
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(objectUrl);

  }

  s2ab(s) { //s2ab (string to array buffer)
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
  }

  binaryDecode = function (data) {
    var ret = '';
    if (data) {
      var byteArray = new Uint8Array(data);
      for (var i = 0; i < data.byteLength; i++) {
        ret = ret + String.fromCharCode(byteArray[i]);
      }
    }
    return ret;
  };

  goToUrl(): void {
  }

}
