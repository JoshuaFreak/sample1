import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HttpClient } from '@angular/common/http';
import { ShowLogProvider } from '../../providers/show-log/show-log';

import { LoginProvider } from '../../providers/login/login';

/**
 * Generated class for the AttendanceHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-attendance-history',
  templateUrl: 'attendance-history.html',
})
export class AttendanceHistoryPage {

  counter: any;
  count: any;
  arr_length: any;
  user_child: any;
  user_child1: any;
  apiUrl: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public showLogProvider: ShowLogProvider, public loginProvider: LoginProvider) {

    this.user_child = this.showLogProvider.user_child_history;
    this.user_child1 = [];
    this.counter = 10;
    this.apiUrl = loginProvider.globalApiUrl;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AttendanceHistoryPage');
  }

  public returnHome() {
    this.navCtrl.setRoot('HomePage');
  }

  doInfinite(infiniteScroll) {
    this.arr_length = this.user_child.length;
    setTimeout(() => {
      this.count = 0;
      for (let i = this.counter; i < this.arr_length; i++) {
        this.user_child1.push(this.user_child[i]);
        this.count++;
        if (this.count == 10) {
          this.counter = i;
          break;
        }
        if(i == this.arr_length)
        {
          this.counter = i;
        }
      }
      infiniteScroll.complete();
    }, 500);
  }

  // doInfinite(): Promise<any> {
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       for (var i = 10; i < 20; i++) {
  //         this.user_child1.push(this.user_child[i]);
  //       }
  //       resolve();
  //     }, 500);
  //   })
  // }

}
