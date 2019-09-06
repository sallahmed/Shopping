import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { emailValidator } from '../../theme/utils/app-validators';
import { AppSettings } from '../../app.settings';
import { Settings } from '../../app.settings.model';
import {UsersService} from '../users/users.service';
import { HttpErrorResponse } from '@angular/common/http';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  static translation;
  currentUser: any;
  isSubmitted = false;
  isLoginError = false;
  public form: FormGroup;
  public settings: Settings;
  profils = ['SUPER_ADMIN', 'ANIMATEUR', 'PORTEUR', 'ADMIN'];
  public langues = [{id: 1, libelle: 'Français', img: 'assets/img/flags/fr.svg'}, {id: 2, libelle: 'English', img: 'assets/img/flags/gb.svg' }];
  public selected = 1;
  constructor(public appSettings: AppSettings, public fb: FormBuilder, public router: Router, private userService: UsersService, private translate: TranslateService){
    this.settings = this.appSettings.settings;
    this.form = this.fb.group({
      // 'identifiant': [null, Validators.compose([Validators.required, emailValidator])],
      'identifiant': [null, Validators.compose([Validators.required])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(6)])] ,
      langue: this.fb.group({
          id: null,
          libelle: null
      }),
    });
    this.translate.addLangs(['en', 'fr']);
    this.translate.setDefaultLang('fr');
    // this.translate.get('BONJOUR').subscribe(result => { console.log(result); });
    /*translate.onLangChange.subscribe((event: LangChangeEvent) => {
        translate.use(event.lang);
    });*/
    translate.use('fr');
  }
    ngOnInit() {
    }

  /*public onSubmit(values:Object):void {
    if (this.form.valid) {
      this.router.navigate(['/dashboard']);
    }
  }*/
    OnSubmit(username, password) {
        if (this.form.valid){
            localStorage.setItem('currentLang',  this.translate.currentLang );
            LoginComponent.translation = this.translate;
            this.isSubmitted = true;
            this.userService.userAuthentication(username, password).subscribe((data: any) => {
                    localStorage.setItem('userToken', data.token);
                    // On récupère l'utilisateur connecté
                    this.userService.getUserClaims().subscribe((user: any) => {
                        this.currentUser = user;
                        localStorage.setItem('currentUser',  JSON.stringify(user));
                        // console.log(this.currentUser.profil);
                        let roles =  this.currentUser ? this.currentUser.profil.code : 'null';
                        localStorage.setItem('menu', this.getMenu(roles));
                        // this.appSettings.menuName = this.getMenu(roles);
                        //this.appSettings.translate = this.translate;
                        //AppSettings.translate = this.translate;
                        this.appSettings.settings.menu = localStorage.getItem('menu') ;
                        this.router.navigate(['/dashboard']);
                    });
                    //this.router.navigate(['/dashboard']);
                },
                (err: HttpErrorResponse) => {
                    this.isLoginError = true;
                    this.isSubmitted = false;
                });
        }

    }

    public getMenu(roles) {
      let menu = '';
        if(roles && roles === this.profils[0]) {
            menu = 'superAdmin';
        }
        else if(roles && roles === this.profils[1]) {
            menu = 'horizontal';
        }
        else if (roles && roles === this.profils[2]) {
           menu =  'porteur';
        }
        else if(roles && roles === this.profils[3]) {
            menu = 'admin';
        }
        return menu;
    }

  ngAfterViewInit(){
    this.settings.loadingSpinner = false;
  }

    getLangue(event) {
        if(event.value === 1) {
            this.translate.use('fr');
        }
        else {
            this.translate.use('en');
        }
    }
}