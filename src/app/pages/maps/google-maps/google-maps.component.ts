import { Component } from '@angular/core';
import { AppSettings } from '../../../app.settings';
import { Settings } from '../../../app.settings.model';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html'
})
export class GoogleMapsComponent {
  public lat: number = 14.7115295; //45.421530
  public lng: number = -17.5411796; //-75.697193
  public zoom: number = 12; //7
  public settings: Settings;
  constructor(public appSettings:AppSettings) { 
    this.settings = this.appSettings.settings; 
  }
}