import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite'

import { ShoppingListService } from './../../services/shopping-list/shopping-list.service';
import { Item } from './../../models/item/item.model';
import { Observable } from 'rxjs/Observable';
import { FCM } from '@ionic-native/fcm';

import { LoginProvider } from '../../providers/login/login';
import { ShowLogProvider } from '../../providers/show-log/show-log';
import { ToastService } from '../../services/toast/toast.service';
import { MenuController } from 'ionic-angular';

import moment from 'moment';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  shoppingList$: Observable<Item[]>;
  token: any;
  // users: any;
  // user_data = JSON.parse(window.localStorage.getItem('user_data'));
  apiAssetUrl: any;
  user_data: any;
  user_child: any;
  person_data_id: any;
  user_child_last_log: any;
  student_log: any;
  time: any;
  time_in: any;
  lunch_in: any;
  lunch_out: any;
  time_out: any;
  user_id: any;
  registration_token: any;
  data1 = { id: 0,person_id: 0, first_name: "", last_name: "" };

  constructor(public navCtrl: NavController, private shopping: ShoppingListService, public loginProvider: LoginProvider, private toast: ToastService, private alertCtrl: AlertController, private sqlite: SQLite, public showLogProvider: ShowLogProvider, public fcm: FCM, public menuCtrl: MenuController) {

    // this.shoppingList$ = this.shopping
    // .getShoppingList() // DB List
    // .snapshotChanges() // Key and Value
    // .map(changes => {
    //     return changes.map(c => ({
    //         key: c.payload.key,
    //         ...c.payload.val(),
    //     }));
    // });
    this.apiAssetUrl = this.loginProvider.globalApiAssetUrl;
    this.user_id = this.loginProvider.datalog.user_id;
    this.registration_token = this.loginProvider.datalog.user_id;
    // this.getUsers();
    this.callUser();
    

  }

  menuToggle() {
    this.menuCtrl.open();
  }
  // getUsers() {
  //   this.restProvider.getUsers()
  //   .then(data => {
  //     this.users = data;
  //     console.log(this.users);
  //   });
  // }

  ionViewDidLoad() {
    this.fcm.onNotification().subscribe(data => {
        if (data.wasTapped) {
    //  alert("Received in background");
          this.toast.show(data.a_data);

          setTimeout(() => {
            this.loadUserChild(this.person_data_id);
          }, 1000);
       } else {
        // alert(data.a_data);
          this.toast.show(data.a_data);

        // this.navCtrl.setRoot('Home');
          setTimeout(() => {
            // this.navCtrl.setRoot('ShowLogPage');
            // location.reload();
            this.loadUserChild(this.person_data_id);
          }, 1000);
       };
     })
  }

  public callUser()
  {
      this.user_data = JSON.parse(window.localStorage.getItem('user_data'));
      // this.toast.show(''+this.user_data.first_name);
        this.sqlite.create({
          name: 'mobile.db',
          location: 'default'
        })
        .then((db: SQLiteObject) => {
          db.executeSql('SELECT * FROM user ORDER BY id DESC', {})
            .then(res => {

              if (res.rows.length > 0) {
                this.data1.id = res.rows.item(0).user_id;
                this.data1.person_id = res.rows.item(0).person_id;
                this.data1.first_name = res.rows.item(0).first_name;
                this.data1.last_name = res.rows.item(0).last_name;
                // this.toast.show(this.data1.last_name + ' ');
                this.loadUserChild(this.data1.person_id);
                this.person_data_id = this.data1.person_id;
              }
            })
            .catch(e => {

              this.toast.show('Error 2');
              console.log(e);
              this.toast.show(e + ' ');
            });
        })
        .catch(e => {
          console.log(e);
          this.toast.show('Error 1');
        });
      // this.loadUserChild(this.user_data.person_id);
  }
  
  public loadUserChild(person_id)
  {
    this.loginProvider.getChild(person_id)
    .then((result) => {
      if (result[0]) {
        // console.log(result);
        // this.toast.show(result[0]+'');
        this.user_child = result[0];
        this.user_child_last_log = result[1];
      }
      else{
        this.toast.show('Error recieving child Data!');
      }
    }, (err) => {
      console.log(err);
    });
  }

  public checkActionLog(student_id)
  {
    this.showLogProvider.showActionLog(student_id,this.loginProvider.globalApiUrl).then(ref => {
      // this.toast.show(ref+'');
      this.navCtrl.setRoot('ShowLogPage');
    });
  }

  public checkActionLogHistory(student_id)
  {
    this.showLogProvider.showActionAllLog(student_id,this.loginProvider.globalApiUrl).then(ref => {
      // this.toast.show('success');
      this.navCtrl.setRoot('AttendanceHistoryPage');
    });
  }

  public checkLog(student_id)
  {
    this.loginProvider.getLog(student_id)
    .then((result) => {
      if (result) {
        console.log(result);
        this.student_log = result;
        // this.toast.show(this.student_log);

        if (this.student_log != ""){
              for (let log of this.student_log) {
                this.time= log;
                // this.toast.show(this.time_in);
              }

              this.time_in = moment('2017-01-01 '+this.time.time_in+'').format('hh:mm a');
              this.lunch_out = moment('2017-01-01 ' + this.time.lunch_out+'').format('hh:mm a');
              this.lunch_in = moment('2017-01-01 ' + this.time.lunch_in+'').format('hh:mm a');
              this.time_out = moment('2017-01-01 ' + this.time.time_out+'').format('hh:mm a');
              let confirm = this.alertCtrl.create({
                title: 'Student Attendance',
                message: 'Time_in: ' + this.time_in + '<br><br>Lunch_out: ' + this.lunch_out + '<br><br>Lunch_in: ' + this.lunch_in + ' <br><br> Time_out: ' + this.time_out,
                buttons: [
                  {
                    text: 'close',
                    handler: () => {
                      // console.log('Disagree clicked');
                    }
                  }
                  // {
                  //   text: 'Agree',
                  //   handler: () => {
                  //     console.log('Agree clicked');
                  //   }
                  // }
                ]
              });
              confirm.present();
        }
        else{
              let confirm = this.alertCtrl.create({
                title: 'Student Attendance',
                message: '<p style="color:#CB2027">No Data Found</p>',
                buttons: [
                  {
                    text: 'close',
                    handler: () => {
                      // console.log('Disagree clicked');
                    }
                  }
                  // {
                  //   text: 'Agree',
                  //   handler: () => {
                  //     console.log('Agree clicked');
                  //   }
                  // }
                ]
              });
              confirm.present();
        }
      }
      else {
        this.toast.show('Error recieving child Data!');
      }
    }, (err) => {
      console.log(err);
    });
  }

  public logOut(user_id,registration_token){
    // this.fcm.onTokenRefresh().subscribe(token => {
    //   alert(token);
    // });


    this.loginProvider.getToken(this.loginProvider.globalApiUrl).then((dataToken) => {
      this.token = dataToken;
        // this.loginProvider.deleteRegistration(registration_token, user_id, this.token.token).then((result_client) => {

        //   if (result_client) {
        //     this.navCtrl.setRoot('LoginPage');
        //     // alert("Logging Out");
        //   }
        //   else {
        //     alert("Logging Out Error!");
        //   }
        // }, (err) => {
        //   // console.log(err);
        //   alert('Cant Log-out');
        // });
      this.loginProvider.deleteRegistration(this.registration_token, user_id, this.token.token).subscribe(res => {

        this.sqlite.create({
          name: 'mobile.db',
          location: 'default'
        })
          .then((db: SQLiteObject) => {
            db.executeSql('Delete FROM user', {})
              .then(res => {
                // if (res.rows.length > 0) {
                this.navCtrl.setRoot('LoginPage');
                // }
              })
              .catch(e => {

                // this.toast.show('Error 2');
                // console.log(e);
                this.toast.show(e + ' ');
              });
          })
          .catch(e => {
            // console.log(e);
            // this.toast.show('Error 1');
          });
      }, (error) => {
        alert("Logging Out Error!");
      });

    }, (err) => {
      console.log(err);
      alert('Cant get Token');
    });

    
  }
  
}
