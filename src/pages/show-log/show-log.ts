import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HttpClient } from '@angular/common/http';
import { ShowLogProvider } from '../../providers/show-log/show-log';

import { LoginProvider } from '../../providers/login/login';
/**
 * Generated class for the ShowLogPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-show-log',
  templateUrl: 'show-log.html',
})
export class ShowLogPage {

  user_child: any;
  // apiUrl = 'http://localhost/git-hijas-5/public/api';
  // apiUrl = 'http://192.168.1.58/git-hijas-5/public/api';
  apiUrl: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public showLogProvider: ShowLogProvider, public loginProvider: LoginProvider) {

    this.user_child = this.showLogProvider.user_child;
    this.apiUrl = loginProvider.globalApiUrl;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowLogPage');
  }

  public returnHome()
  {
    this.navCtrl.setRoot('HomePage');
  }
}
