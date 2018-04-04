import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

// import { LoginProvider } from '../../providers/login/login';

/*
  Generated class for the ShowLogProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ShowLogProvider {
  apiUrl: string;
  apiUrL: any;

  user_child: any;
  user_child_history: any;
  // apiUrl = 'http://localhost/git-hijas-5/public/api';
  // apiUrl = 'http://192.168.1.58/git-hijas-5/public/api';
  
  constructor(public http: HttpClient) {
    console.log('Hello ShowLogProvider Provider');
    // this.apiUrL = loginProvider.globalApiUrl;
  }

  public showActionLog(student_id,apiUrl) {
    return new Promise((resolve, reject) => {
      this.http.get(apiUrl + '/getStudentActionLog?student_id=' + student_id)
        .subscribe(res => {
          if (res) {
            this.user_child = res;
            resolve(res);
          }
        }, (err) => {
          reject(err);
        });
    });
  }

  public showActionAllLog(student_id, apiUrl) {
    return new Promise((resolve, reject) => {
      this.http.get(apiUrl + '/getStudentAllActionLog?student_id=' + student_id)
        .subscribe(res => {
          if (res) {
            this.user_child_history = res;
            resolve(res);
          }
        }, (err) => {
          reject(err);
          alert(apiUrl+'-'+student_id);
        });
    });
  }

}
