import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { FCM } from '@ionic-native/fcm';

import { LoginProvider } from '../../providers/login/login';
import { ToastService } from '../../services/toast/toast.service';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  data = { username: '', password: '' };
  user_data: any;
  token: any;
  registration_token: any;
  dataSQL = { user_id: 0, person_id: 0, first_name: "", last_name: "", db_id: 0 };
  data1 = { first_name: "", last_name: "" };

  constructor(public navCtrl: NavController, public navParams: NavParams, public loginProvider: LoginProvider, private toast: ToastService, private sqlite: SQLite, public fcm: FCM) {
  }

  ionViewDidLoad() {

    this.createDb();
    // console.log('ionViewDidLoad LoginPage');
    // this.loginProvider.getToken().then((dataToken) => {
    //   this.token = dataToken;
    // }, (err) => {
    //   console.log(err);
    //   alert('Cant get Token');
    // });
  }

  public getToken(api_url, api_asset_url, id, person_id, first_name, last_name, db_id) {
    this.loginProvider.getToken(api_url).then((dataToken) => {
      this.token = dataToken;
      this.postRegisterToken(id, person_id, first_name, last_name, db_id, this.token.token, api_url, api_asset_url);
      // this.navCtrl.setRoot('HomePage');
    }, (err) => {
      console.log(err);
      alert('Cant get Token');
    });

  }

  public createDb() {
    this.sqlite.create({
      name: 'mobile.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {

        db.executeSql('CREATE TABLE IF NOT EXISTS user(id INTEGER PRIMARY KEY,user_id INT,person_id INT, first_name TEXT, last_name TEXT,db_id INT,api_url TEXT,api_asset_url TEXT)', {})
          .then(res => {
              // console.log('Executed SQL'){}

              this.getUserDataSQL();
          })
          .catch(e => console.log(e));
        // db.executeSql('create table user(user_id INT(11),first_name VARCHAR(50),last_name VARCHAR(50))', {})
        //   .then(() => console.log('Executed SQL'))
        //   .catch(e => console.log(e));
        // db.executeSql('INSERT INTO user VALUES(NULL,?,?,?)', ['1', 'sample', 'sample2'])
        //   .then(() => console.log('Executed SQL'))
        //   .catch(e => console.log(e));
      })
      .catch(e => console.log(e));
  }

  public getUserDataSQL() {

    this.sqlite.create({
      name: 'mobile.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql('SELECT * FROM user ORDER BY id DESC', {})
          .then(res => {

            if (res.rows.length > 0) {
              this.data1.first_name = res.rows.item(0).first_name;
              this.data1.last_name = res.rows.item(0).last_name;
              this.loginProvider.globalApiUrl = res.rows.item(0).api_url;
              this.loginProvider.globalApiAssetUrl = res.rows.item(0).api_asset_url;
              this.loginProvider.datalog.user_id = res.rows.item(0).user_id;
              // this.toast.show(this.data1.last_name + ' ');
              this.navCtrl.setRoot('HomePage');
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
  }

  public saveUserDataSQL(id, person_id, first_name, last_name, db_id,api_url,api_asset_url) {
    this.sqlite.create({
      name: 'mobile.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql('INSERT INTO user VALUES(NULL,?,?,?,?,?,?,?)', [id, person_id, first_name, last_name, db_id, api_url, api_asset_url])
          .then(() => console.log('Executed SQL'))
          .catch(e => console.log(e));
      })
      .catch(e => {
        console.log(e);
        this.toast.show('Error 1');
      });
  }

  public authorizeUser() {
    this.loginProvider.logUser(this.data).then((result) => {
      // console.log(result);
      // this.toast.show(result+'');
      if (result[1] != null && result[1] != 0) {
        window.localStorage.setItem('user_data', JSON.stringify(result[0]));
        this.dataSQL.user_id = result[0].gen_user_id;
        // this.dataSQL.user_id = result[0].id;
        this.dataSQL.person_id = result[0].person_id;
        this.dataSQL.first_name = result[0].first_name;
        this.dataSQL.last_name = result[0].last_name;
        this.dataSQL.db_id = result[0].id;
        this.loginProvider.datalog.user_id = result[0].gen_user_id;
        this.loginProvider.globalApiUrl = result[0].api_url;
        this.loginProvider.globalApiAssetUrl = result[0].api_asset_url;

        this.getToken(result[0].api_url, result[0].api_asset_url, result[0].gen_user_id, result[0].person_id, result[0].first_name, result[0].last_name, result[0].gen_user_id);
        // this.fcm.onTokenRefresh().subscribe(token => {
        //   this.registration_token = token;
        // });


      }
      else {
        this.toast.show('Login Error');
      }
    }, (err) => {
      console.log(err);
      this.toast.show('Connection Failed');
    });



    // this.loginProvider.getToken().subscribe(token => {

    // this.loginProvider.saveRegistration('eta', result[0].person_id,this.token.token).then((result_client) => {
    //     if (result_client[0] != null && result_client[0] != 0)
    //     {
    //       alert(result_client[0]);
    //     }
    //     else
    //     {
    //       alert('Cant Save Data');
    //     }
    // }, (err) => {
    //   console.log(err);
    //   alert('Cant Post');
    // });

    // // ------ Save Client Registration to Gakkou System API ---  
    // this.fcm.getToken().then(token => {
    //   alert(token);
    //   this.registration_token = token;
    // });

    // this.loginProvider.saveRegistration(this.registration_token, result[0].person_id,this.token).then((result_client) => {
    //     if (result_client[0] != null && result_client[0] != 0)
    //     {
    //     }
    //     else
    //     {
    //       alert('Cant Save Data');
    //     }
    // }, (err) => {
    //   console.log(err);
    //   alert('Cant Post');
    // });
  }

  public postRegisterToken(id, person_id, first_name, last_name, db_id, postToken, api_url, api_asset_url) {
    // this.loginProvider.saveRegistration(register_token, person_id, this.token.token).subscribe(res => {
    //   this.navCtrl.setRoot('HomePage');
    //   // this.messageService.presentToast("updateMessageSentStatus: id[" + message_id + "]" + " is_send[" + is_send + "]", 1, "top");
    // }, (error) => {
    //   // this.messageService.showLog("Error on updateMessageSentStatus" + JSON.stringify(error));
    // });

    // this.saveUserSql(this.dataSQL);
    // ------ Save Client Registration to Gakkou System API ---  
    this.fcm.getToken().then(token => {
      // alert(token);
      this.registration_token = token;
    });
    this.loginProvider.datalog.user_id = id;
    this.loginProvider.datalog.registration_token = this.registration_token;
    // this.loginProvider.saveRegistration(this.registration_token, person_id,token).then((result_client) => {

    //   if (result_client)
    //   {
    //     this.saveUserDataSQL(id, person_id, first_name, last_name, db_id);
    //     this.navCtrl.setRoot('HomePage');
    //   }
    //   else
    //   {
    //     alert("no data");
    //   }
    // }, (err) => {
    //   console.log(err);
    //   alert('Cant Post');
    // });
    this.loginProvider.saveRegistration(this.registration_token, person_id, postToken).subscribe(res => {
        // alert("success");
      this.saveUserDataSQL(id, person_id, first_name, last_name, db_id, api_url, api_asset_url);
        this.navCtrl.setRoot('HomePage');
    }, (error) => {
      alert(error);
    });
    // this.navCtrl.setRoot('HomePage');
    // this.saveUserDataSQL(id, person_id, first_name, last_name, db_id);
  }

  // saveUserSql(dataSQL) {
  //   this.sqlite.create({
  //     name: 'mobile.db',
  //     location: 'default'
  //   }).then((db: SQLiteObject) => {
  //     db.executeSql('INSERT INTO user VALUES(NULL,?,?,?)', [this.dataSQL.user_id, this.dataSQL.first_name, this.dataSQL.last_name])
  //       .then(res => {
  //         console.log(res);
  //         this.toast.show('Data saved');
  //         // this.navCtrl.popToRoot();
  //         this.navCtrl.setRoot('HomePage');
  //       })
  //       .catch(e => {
  //         console.log(e);
  //         this.toast.show(e);
  //       });
  //   }).catch(e => {
  //     console.log(e);
  //     this.toast.show(e);
  //   });
  // }
}
