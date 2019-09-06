import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../../shared/shared.module';
import { PipesModule } from '../../theme/pipes/pipes.module';
import { UsersComponent } from './users.component';
import { UsersData } from './users.data';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { ProfileComponent } from './profile/profile.component';
import { HelpComponent } from './help/help.component';
import {UsersService} from './users.service';
import {AuthInterceptor} from '../../auth/auth.interceptor';
import {AuthGuard} from '../../auth/auth.guard';
import { SharedLazyModule } from '../../shared/shared-lazy.module';

export const routes = [
  { path: '', component: UsersComponent, pathMatch: 'full' },
  { path: 'profile', component: ProfileComponent, data: { breadcrumb: 'Mon Profil' } },
  { path: 'help', component: HelpComponent, data: { breadcrumb: 'page d\'aide' } }
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    // InMemoryWebApiModule.forRoot(UsersData, { delay: 500 }),
    NgxPaginationModule,
    SharedModule,
    PipesModule,
    SharedLazyModule
  ],
  declarations: [
    UsersComponent,
    UserDialogComponent,
    ProfileComponent,
    HelpComponent
  ],
  entryComponents:[
    UserDialogComponent
  ],
  providers: [
    UsersService,
    AuthGuard,
    {
      provide : HTTP_INTERCEPTORS,
      useClass : AuthInterceptor,
      multi : true
    }
  ]
})
export class UsersModule { }
