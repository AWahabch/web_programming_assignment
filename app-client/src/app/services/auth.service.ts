import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { User } from '../models/user';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from '../../environments/environment';
import { Globals } from '../globals';
import { Constants } from '../constants';
@Injectable()
export class AuthService {

  private BASE_URL: string = environment.apiUrl;
  constructor(private http: Http, private globals: Globals) { }
  login(user): Promise<any> {

    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let url: string = `${this.BASE_URL}/users/login`;
    let query = "username=" + user.username + "&password=" + user.password

    return this.http.post(url, query, { headers: headers }).map(
      res => {
        if (res.json().token) {
          localStorage.setItem('currentUser', user.username);
          localStorage.setItem('currentUserInfo', JSON.stringify(res.json()));
          this.globals.username.next(user.username);
          var roles =  res.json().roles;
          roles.forEach(element => {
            if(element._id == Constants.SuperAdminRoleId)
            {
              this.globals.hasSuperAdminPer.next(true);
              this.globals.hasGroupAdminPer.next(true);
              return;
            }

            if(element._id == Constants.GroupAdminRoleId)
            {
              this.globals.hasGroupAdminPer.next(true);
            }
          });
         

          if (res.json()["imageUrl"]) {
            this.globals.imageUrl.next(this.BASE_URL + '/users/image/' + res.json()["imageUrl"]);
          }
          localStorage.setItem('accessToken', res.json().token);
        }
        return res
      },
      err => {
        return err;
      }
    ).toPromise();
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('currentUserInfo');
  }

}
