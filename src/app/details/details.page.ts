import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }
  goBack(): void {
    this.navCtrl.back();
  }

}
