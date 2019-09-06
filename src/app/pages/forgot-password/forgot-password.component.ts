import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { emailValidator, matchingPasswords } from '../../theme/utils/app-validators';
import { AppSettings } from '../../app.settings';
import { Settings } from '../../app.settings.model';
import { MatSnackBar } from '@angular/material';
import {UsersService} from '../users/users.service';
import { HttpErrorResponse } from '@angular/common/http';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent {

    public form:FormGroup;
    public settings: Settings;
    public isSubmitted = false;
    constructor(public appSettings:AppSettings, public fb: FormBuilder, public router:Router, public snackBar: MatSnackBar,
                private userService: UsersService, private route: ActivatedRoute){
        this.settings = this.appSettings.settings;
        this.form = this.fb.group({
            'email': [null, Validators.compose([Validators.required])],
            //'email': [null, Validators.compose([Validators.required, emailValidator])],
            'resetToken': null
        });
        route.queryParams.subscribe(params =>{
            this.form['resetToken'] = params['token'];
        });
    }

    public onSubmit(values:Object):void {
        if (this.form.valid) {
            this.isSubmitted = true;
            this.userService.changePassword(values).subscribe((data: any) => {
                this.isSubmitted = false;
                this.snackBar.open('Un lien vous a été envoyé à votre adresse e-mail, afin de réinitialiser votre mot de passe!', null, {
                    duration:7000,
                });
                this.router.navigate(['/']);
            },
                (err: HttpErrorResponse) => {
                    this.isSubmitted = false;
                    this.snackBar.open('Oups..Erreur!!Identifiant ou adresse e-mail invalide!','Echec', {
                        duration: 7000,
                    });
                }
            );
            //this.router.navigate(['/']);
        }
    }

    ngAfterViewInit(){
        this.settings.loadingSpinner = false;
    }

}
