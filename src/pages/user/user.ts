import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {
	
	user = { name: '', username: '', email: '', phone: '', website: '', address: { street: '', suite: '', city: '', zipcode: '', geo: { lat: '', lng: '' } }, company: { name: '', bs: '', catchPhrase: '' }};

  constructor(public navCtrl: NavController, public navParams: NavParams,public restProvider: RestProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPage');
  }

  	saveUser() {
	  this.restProvider.addUser(this.user).then((result) => {
	    console.log(result);
	    this.navCtrl.setRoot('HomePage');
	  }, (err) => {
	    console.log(err);
	  });
	}
	// saveUser() {
	//   this.restapiService.saveUser(this.user).then((result) => {
	//     console.log(result);
	//   }, (err) => {
	//     console.log(err);
	//   });
	// }
}
