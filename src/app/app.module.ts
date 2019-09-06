import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayContainer } from '@angular/cdk/overlay';
import { CustomOverlayContainer } from './theme/utils/custom-overlay-container';

import { AgmCoreModule } from '@agm/core';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  wheelPropagation: true,
  suppressScrollX: true
};
import { CalendarModule, DateAdapter  } from 'angular-calendar';
import { SharedModule } from './shared/shared.module';
import { PipesModule } from './theme/pipes/pipes.module';
import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { PagesComponent } from './pages/pages.component';
import { BlankComponent } from './pages/blank/blank.component';
import { SearchComponent } from './pages/search/search.component';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import { ErrorComponent } from './pages/errors/error/error.component';
import { AppSettings } from './app.settings';

import { SidenavComponent } from './theme/components/sidenav/sidenav.component';
import { HorizontalMenuComponent } from './theme/components/menu/horizontal-menu/horizontal-menu.component';
import { AdminMenuComponent } from './theme/components/menu/admin-menu/admin-menu.component';
import { PorteurMenuComponent } from './theme/components/menu/porteur-menu/porteur-menu.component';
import { SuperAdminMenuComponent } from './theme/components/menu/super-admin-menu/super-admin-menu.component';
import { BreadcrumbComponent } from './theme/components/breadcrumb/breadcrumb.component';
import { FlagsMenuComponent } from './theme/components/flags-menu/flags-menu.component';
import { FullScreenComponent } from './theme/components/fullscreen/fullscreen.component';
import { ApplicationsComponent } from './theme/components/applications/applications.component';
import { MessagesComponent } from './theme/components/messages/messages.component';
import { UserMenuComponent } from './theme/components/user-menu/user-menu.component';

import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {UsersService} from './pages/users/users.service';
import {ControlesService} from './pages/controles/list-controle/controles.service';

import { ToastrModule } from 'ngx-toastr';
import { ReportingsService } from './pages/reportings/reportings.service';
import { ConfirmationDialogComponent } from './pages/confirmation-dialog/confirmation-dialog.component';
import {TranslateModule, TranslateLoader, TranslateService, TranslatePipe} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

// required for AOT compilation
export function createTranslateLoader(http: HttpClient) {
    // return new TranslateHttpLoader(http);
    // return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
    return new TranslateHttpLoader(http, './assets/i18n/', '.json'); // Pour le build

}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    /*AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDe_oVpi9eRSN99G4o6TwVjJbFBNr58NxE'
    })*/ AgmCoreModule.forRoot(),
    PerfectScrollbarModule,
    CalendarModule.forRoot({provide: DateAdapter, useFactory: adapterFactory}),
    SharedModule,
    PipesModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    routing
  ],
  declarations: [
    AppComponent,
    PagesComponent,
    BlankComponent,
    SearchComponent,
    NotFoundComponent,
    ErrorComponent,
    SidenavComponent,
    HorizontalMenuComponent,
    AdminMenuComponent,
    PorteurMenuComponent,
    SuperAdminMenuComponent,
    BreadcrumbComponent,
    FlagsMenuComponent,
    FullScreenComponent,
    ApplicationsComponent,
    MessagesComponent,
    UserMenuComponent,
    ConfirmationDialogComponent,
    // TranslatePipe
  ],
  entryComponents: [ConfirmationDialogComponent],
  providers: [
    AppSettings,
    ControlesService,
    ReportingsService,
    UsersService,
    // TranslateService,
    AuthGuard,
    {
      provide : HTTP_INTERCEPTORS,
      useClass : AuthInterceptor,
      multi : true
    },
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG },
    { provide: OverlayContainer, useClass: CustomOverlayContainer }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
    /*constructor(private translate: TranslateService) {

        translate.addLangs(["en", "fr"]);
        translate.setDefaultLang('en');

        let browserLang = translate.getBrowserLang();
        translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
    }*/
}
