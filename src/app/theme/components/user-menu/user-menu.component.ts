import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {UsersService} from '../../../pages/users/users.service';
//import { User } from '../../../pages/user/user.model';
import { Router } from '@angular/router';
import { LoginComponent } from '../../../pages/login/login.component';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UserMenuComponent implements OnInit {
   public userClaims: any;
  //public userClaims: User;
  // public userImage = '../assets/img/users/user.jpg';
  public userImage = 'assets/img/users/default-user.jpg';
  constructor(private router: Router, private userService: UsersService, private translateService: TranslateService) {
      translateService.setDefaultLang('fr');
      translateService.setDefaultLang(LoginComponent.translation ? LoginComponent.translation.currentLang : 'fr');
  }

  ngOnInit() {
      this.userClaims = JSON.parse(localStorage.getItem('currentUser'));
      this.userImage = this.userClaims.url_photo ? 'http://' + this.userClaims.url_photo : 'assets/img/users/default-user.jpg';
      /*
      this.userService.getUserClaims().subscribe((data: any) => {
          this.userClaims = data;
      });*/
  }

    Logout() {
        localStorage.removeItem('userToken');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('menu');
        localStorage.removeItem('currentLang');
        this.router.navigate(['/login']);
    }

}
