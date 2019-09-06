import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {ModuleWithProviders} from '@angular/compiler/src/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { Observable } from 'rxjs';

// required for AOT compilation
export function createTranslaterLoader(httpClient: HttpClient) {
    //return new TranslateHttpLoader(httpClient, '../../assets/i18n/', '.json');
    return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json'); //Pour le build
}

export class CustomLoader implements TranslateLoader {
    getTranslation(lang: string): Observable<any> {
        return Observable.of({KEY: 'value'});
        //return this.http.get(`../../assets/i18n/${lang}.json`);
    }
}

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild({
        loader: {
            provide: TranslateLoader,
            useFactory: (createTranslaterLoader),
            deps: [HttpClient]
            //useClass: CustomLoader
        },
        isolate: true
    })
  ],
  exports: [TranslateModule],
  declarations: []
})
export class SharedLazyModule {
  /*static forRoot(): ModuleWithProviders {
    return {
      ngModule: LangueModule
    }
  }*/
  /*constructor(private translate: TranslateService) {
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');
    translate.use('en');
  }*/

}
