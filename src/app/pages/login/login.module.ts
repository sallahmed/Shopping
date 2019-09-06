import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { LoginComponent } from './login.component';

import { AuthGuard } from '../../auth/auth.guard';
import { AuthInterceptor } from '../../auth/auth.interceptor';
import {HttpClientModule, HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http';
import {UsersService} from '../users/users.service';
import { SharedLazyModule } from '../../shared/shared-lazy.module';
import {TranslateModule} from '@ngx-translate/core';

export const routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    SharedLazyModule
  ],
  declarations: [
    LoginComponent
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
export class LoginModule { }