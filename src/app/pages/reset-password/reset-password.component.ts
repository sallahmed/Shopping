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
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent {

    public form:FormGroup;
    //password = 'password'; confirmation = 'confirmation';
    public settings: Settings;
    isSubmitted = false;
    constructor(public appSettings:AppSettings, public fb: FormBuilder, public router:Router, public snackBar: MatSnackBar,
                private userService: UsersService, private route: ActivatedRoute){
        this.settings = this.appSettings.settings;
        this.form = this.fb.group({
            password: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
            confirmation: [null, Validators.compose([Validators.required/*Validators.compose([matchingPasswords('password','confirmation').bind(this)])*/])],
            'token': null
        },{validator: matchingPasswords('password', 'confirmation')});
        route.queryParams.subscribe(params =>{
            //this.form['token'] = params['token'];
            this.form.patchValue({token: params['token']})
            localStorage.setItem('userToken', params['token']); //On renregistre l token pour le interceptor
        });

        //Dans le constructeur, on doit appelle la méthode reset_password pour vérifier si le confirmation token est valide pour rediriger vers ce formulaire, sinon, on redirige vers la page d'accueil
        //Après validation, on appelle la méthode reset
    }

    ngOnInit() {
        /*
        this._route.queryParams.subscribe((params: Params) => {
            let token = params['reset_password_token'];
            let options = { search: { reset_password_token: token, redirect_url: 'auth/password' } };
            this._tokenService.get('auth/password/edit', options)
                .subscribe(
                    res => this.headerInfo = res.json(),
                    err => {
                    this._alertService.error('Password could not be reset with this token');
                    this._router.navigate(['/users/signin']);
                }
            );
        });*/
    }

    public onSubmit(values:Object):void {
        if (this.form.valid) {
            this.isSubmitted = true;
            this.userService.resetPassword(values).subscribe((data: any) => {
                    this.route.queryParams.subscribe(params =>{
                        localStorage.setItem('userToken', params['token']);
                    });
                    this.isSubmitted = false;
                    this.snackBar.open('Mot de passe changé avec succès!', null, {
                        duration: 4000,
                    });
                    this.router.navigate(['/']);
                },
                (err: HttpErrorResponse) => {
                    this.isSubmitted = false;
                    this.snackBar.open('Echec changement mot de passe','Echec', {
                        duration: 4000,
                    });
                }
            );
            //this.router.navigate(['/']);
            /*this.snackBar.open('Mail envoyé à ' + mail.to + ' avec succès!', null, {
                duration: 2000,
            });*/
        }
    }

    ngAfterViewInit(){
        this.settings.loadingSpinner = false;
    }

}
