import { Routes, RouterModule, PreloadAllModules  } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { PagesComponent } from './pages/pages.component';
import { BlankComponent } from './pages/blank/blank.component';
import { SearchComponent } from './pages/search/search.component';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import { ErrorComponent } from './pages/errors/error/error.component';
import {ForgotPasswordModule} from './pages/forgot-password/forgot-password.module';
import {AuthGuard} from './auth/auth.guard';

export const routes: Routes = [
    { path: '', loadChildren: 'app/pages/login/login.module#LoginModule' },
    { path: 'login', loadChildren: 'app/pages/login/login.module#LoginModule' },
    { 
        path: '',
        component: PagesComponent, children: [
            { path: 'dashboard',  canActivate: [AuthGuard], loadChildren: 'app/pages/dashboard/dashboard.module#DashboardModule', data: { breadcrumb: 'Dashboard' } },
            { path: 'users',  canActivate: [AuthGuard], loadChildren: 'app/pages/users/users.module#UsersModule', data: { breadcrumb: 'Utilisateurs' } },
            { path: 'ui', loadChildren: 'app/pages/ui/ui.module#UiModule', data: { breadcrumb: 'UI' } },
           // { path: 'form-controls', loadChildren: 'app/pages/form-controls/form-controls.module#FormControlsModule', data: { breadcrumb: 'Form Controls' } },
            { path: 'parametres', loadChildren: 'app/pages/parametres/parametres.module#ParametresModule', data: { breadcrumb: 'Parametres' } },
            { path: 'controles', loadChildren: 'app/pages/controles/tables.module#TablesModule', data: { breadcrumb: 'Contrôles' } },
            { path: 'icons', loadChildren: 'app/pages/icons/icons.module#IconsModule', data: { breadcrumb: 'Material Icons' } },
            { path: 'drag-drop', loadChildren: 'app/pages/drag-drop/drag-drop.module#DragDropModule', data: { breadcrumb: 'Drag & Drop' } },
            { path: 'schedule', loadChildren: 'app/pages/schedule/schedule.module#ScheduleModule', data: { breadcrumb: 'Schedule' } },
            { path: 'mailbox', loadChildren: 'app/pages/mailbox/mailbox.module#MailboxModule', data: { breadcrumb: 'Mailbox' } },
            { path: 'chat', loadChildren: 'app/pages/chat/chat.module#ChatModule', data: { breadcrumb: 'Chat' } },
            { path: 'maps', loadChildren: 'app/pages/maps/maps.module#MapsModule', data: { breadcrumb: 'Maps' } },
            { path: 'reportings', loadChildren: 'app/pages/reportings/charts.module#ChartsModule', data: { breadcrumb: 'Reportings' } },
            { path: 'dynamic-menu', loadChildren: 'app/pages/dynamic-menu/dynamic-menu.module#DynamicMenuModule', data: { breadcrumb: 'Dynamic Menu' }  },          
            { path: 'blank', component: BlankComponent, data: { breadcrumb: 'Blank page' } },
            { path: 'search', component: SearchComponent, data: { breadcrumb: 'Search' } },
            //{ path: 'entites',  canActivate: [AuthGuard], loadChildren: 'app/pages/entites/entites.module#EntitesModule', data: { breadcrumb: 'Entites' } },
        ]
    },
    { path: 'landing', loadChildren: 'app/pages/landing/landing.module#LandingModule' },
    // { path: 'login', loadChildren: 'app/pages/login/login.module#LoginModule' },
    { path: 'register', loadChildren: 'app/pages/register/register.module#RegisterModule' },
    { path: 'forgot-password', loadChildren: 'app/pages/forgot-password/forgot-password.module#ForgotPasswordModule' },
    { path: 'reset-password', loadChildren: 'app/pages/reset-password/reset-password.module#ResetPasswordModule' },
    { path: 'error', component: ErrorComponent, data: { breadcrumb: 'Error' } },
    { path: '**', component: NotFoundComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
   preloadingStrategy: PreloadAllModules,  // <- comment this line for activate lazy load
   useHash: true //Active le routage après le build
});