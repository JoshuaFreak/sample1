import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Headers, Request, RequestOptions, Response, RequestMethod } from "@angular/http";
// import { Http, Headers, Request, RequestOptions, Response, RequestMethod } from "@angular/http";
import { Observable } from "rxjs";
import 'rxjs/add/operator/map';

import { ToastService } from '../../services/toast/toast.service';

/*
  Generated class for the LoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginProvider {

  apiUrl = 'http://gams.itechrar.com/api';
  // apiUrl = 'http://192.168.1.58/git-hijas-5/public/api';
  globalApiUrl: any;
  globalApiAssetUrl: any;
  clientData: any;
  res: any = {};
  datalog = { user_id: 0, registration_token: "" };
  // apiUrl = 'http://localhost/git-hijas-5/public/api';

  constructor(public http: HttpClient, public http1: Http, private toast: ToastService) {
    // console.log('Hello LoginProvider Provider');
    this.res.username = '';
    this.res.response = '';

    this.http = http;
  }

  public logUser(data) {
    return new Promise((resolve, reject) => {
      // this.http.post(this.apiUrl + '/login', JSON.stringify(data))
      this.http.get(this.apiUrl + '/login?username=' + data.username + '&password=' + data.password)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  public getChild(person_id) {
    return new Promise((resolve, reject) => {
      // this.http.post(this.apiUrl + '/login', JSON.stringify(data)));
      this.http.get(this.globalApiUrl + '/getStudent?person_id=' + person_id)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  public getLog(student_id) {
    return new Promise((resolve, reject) => {
      // this.http.post(this.apiUrl + '/login', JSON.stringify(data))
      this.http.get(this.globalApiUrl + '/getStudentLog?student_id=' + student_id)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  public saveRegistration(registration_token, person_id, token) {
    // return new Promise((resolve, reject) => {
    //     let headers = new Headers({ 'Content-Type': 'application/json' });
    //     let options = new RequestOptions({
    //       headers: headers
    //     });

    //   this.clientData = JSON.stringify({ registration_token: registration_token, person_id: person_id, _token: token });
    //   this.http1.post(this.globalApiUrl + '/saveUserRegistration', this.clientData, options)
    //   .subscribe(res => {
    //     // resolve(res);
    //     // alert(res);
    //     // this.res.response = res["_body"];
    //     // alert(this.res.response);
    //     // alert(this.apiUrl + '/saveUserRegistration'+ this.clientData);
    //   }, error => {
    //     alert(error);
    //     // reject(error);
    //   });
    // });

    return Observable.create(observer => {
      //let headers = new Headers({
      //    "Content-Type": "application/x-www-form-urlencoded"
      //});

      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({
        headers: headers
      });

      let clientData = JSON.stringify({ registration_token: registration_token, person_id: person_id, _token: token });

      this.http1.post(this.globalApiUrl + "/saveUserRegistration", clientData, options).map(res => res.json()).subscribe(data => {
        // alert("success");
        observer.next(true);
        observer.complete();
      }, (error) => {
        // alert("Please enter valid user.");
        this.saveRegistration(registration_token, person_id, token);
        // alert(this.globalApiUrl + JSON.stringify(error));
        // alert("Please Log-in Again!");
      });
    });

    // return Observable.create(observer => {
    //   //let headers = new Headers({
    //   //    "Content-Type": "application/x-www-form-urlencoded"
    //   //});

    //   let headers = new Headers({ 'Content-Type': 'application/json' });


    //   let options = new RequestOptions({
    //     headers: headers
    //   });



    //   let clientData = JSON.stringify({ registration_token: registration_token, person_id: person_id, _token: token });

    //   //    this.showLog("postData" + postData);

    //   this.http1.post(this.apiUrl + "/saveUserRegistration", clientData, options).map(res => res.json()).subscribe(data => {
    //     alert("success");
    //     observer.next(true);
    //     observer.complete();
    //   }, (error) => {
    //     alert("error post");
    //     // this.showLog(apiUrl + "2017-09-03 1 /apiUpdateSms error  " + JSON.stringify(error));
    //   });


    // });
  }
  public deleteRegistration(registration_token, user_id, token) {
    return Observable.create(observer => {
      //let headers = new Headers({
      //    "Content-Type": "application/x-www-form-urlencoded"
      //});

      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({
        headers: headers
      });

      let clientData = JSON.stringify({ registration_token: registration_token, user_id: user_id, _token: token });

      this.http1.post(this.globalApiUrl + "/deleteUserRegistration", clientData, options).map(res => res.json()).subscribe(data => {
        
        observer.next(true);
        observer.complete();
      }, (error) => {
        // alert("error");
        this.deleteRegistration(registration_token, user_id, token);
        // alert(this.globalApiUrl + JSON.stringify(error));
        // alert("Please Log-in Again!");
      });
    });
    // return new Promise((resolve, reject) => {
    //   let headers = new Headers({ 'Content-Type': 'application/json' });
    //   let options = new RequestOptions({
    //     headers: headers
    //   });

    //   this.clientData = JSON.stringify({ registration_token: registration_token, user_id: user_id, _token: token });
    //   this.http1.post(this.globalApiUrl + '/deleteUserRegistration', this.clientData, options)
    //     .subscribe(res => {
    //       resolve(res);
    //       // this.res.response = res["_body"];
    //       // alert(this.res.response);
    //       // alert(this.apiUrl + '/saveUserRegistration'+ this.clientData);
    //     }, error => {
    //       reject(error);
    //     });
    // });
  }

  public getToken(apiUrl) {
    return new Promise((resolve, reject) => {
      // this.http.post(this.apiUrl + '/login', JSON.stringify(data))
      this.http.get(apiUrl + '/getToken')
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

}
