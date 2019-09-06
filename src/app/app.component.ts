import { Component, ViewChild} from '@angular/core';
import { AppSettings } from './app.settings';
import { Settings } from './app.settings.model';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public settings: Settings;
  constructor(public appSettings: AppSettings, translate: TranslateService) {
      this.settings = this.appSettings.settings;
      /*translate.addLangs(['en', 'fr']);
      translate.setDefaultLang('fr');*/
  }

  ngOnInit() { }

}