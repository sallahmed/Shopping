import { Injectable } from '@angular/core';
import { Settings } from './app.settings.model';

@Injectable()
export class AppSettings {
    // menuName = localStorage.getItem('menu') ? localStorage.getItem('menu') : 'admin';
    menuName = localStorage.getItem('menu') ? localStorage.getItem('menu') : '';
    // menuName ='admin';
    // profils = ['Super Administrateur', 'Administrateur'];
    // currentUser: any = JSON.parse(localStorage.getItem('currentUser'));
    // roles =  this.currentUser ? this.currentUser.profil.libelle : 'null';
    // public rootUrl = 'http://localhost/opera/web/app_dev.php/';
    // public rootUrl = 'http://localhost/opera/web/';
    public flagUrl = 'http://localhost/opera/web/upload/images/';
    // public flagUrl = 'http://213.154.64.77/usersdir/mabiala/opera-server/web/upload/images/';
    // public flagUrl = 'http://10.90.22.191/usersdir/mabiala/opera-server/web/upload/images/';
    // public flagUrl = 'http://10.137.16.67:4201/backend/web/upload/images/';
    public rootUrl = 'http://10.90.22.191/usersdir/mabiala/opera-server/web/app_dev.php/';
    // public rootUrl = 'http://10.90.22.191/usersdir/mabiala/opera-server/web/';
    // public rootUrl = 'http://10.137.16.67:4201/backend/web/app_dev.php/';
    // public rootUrl = 'http://213.154.64.77/usersdir/mabiala/opera-server/web/app_dev.php/';
    // public rootUrl = 'http://213.154.64.77/usersdir/mabiala/opera-server/web/';
    // public rootUrl = 'http://213.154.64.77/usersdir/mohamed/opera/web/app_dev.php/';
    public settings = new Settings(
        'Opera',    // theme name
        true,       // loadingSpinner
        true,       // fixedHeader
        true,       // sidenavIsOpened
        true,       // sidenavIsPinned
        true,       // sidenavUserBlock
        // 'horizontal', horizontal , vertical
        this.menuName, // horizontal , vertical
        'default',  // default, compact, mini
        'orange-light',   // indigo-light, teal-light, red-light, blue-dark, green-dark, pink-dark
        false       // true = rtl, false = ltr
    );
}
