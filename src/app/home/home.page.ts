import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DetailsPage } from '../details/details.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  Articles: any[];
  constructor(public navCtrl: NavController) {
    this.Articles = [
      { url: 'D:/service.png', nom: 'Television', prix: 125000, details: "Lorem ipsum Télévision" },
      { url: 'D:/service.png', nom: 'Téléphone', prix: 85000, details: "Lorem ipsum Téléphone" },
      { url: 'D:/service.png', nom: 'Sac à dos', prix: 10000, details: "Lorem ipsum Sac à dos" },
      { url: 'D:/service.png', nom: 'MacBook Air', prix: 375000, details: "Lorem ipsum MacBook Air" }
    ]
  }
  showDetails(article): void {
    this.navCtrl.navigateRoot('details');
  }

}
