import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Channel } from '../models/channel';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from '../../environments/environment';
import { Globals } from '../globals';
import { User } from '../models/user';
import { Group } from '../models/group';
import { Role } from '../models/role';

@Injectable()
export class UsersService {

  private BASE_URL: string = environment.apiUrl;
  constructor(private http: Http, private globals: Globals) { }

  getUsers(): Promise<any> {
    let token = localStorage.getItem('accessToken');
    let headers = new Headers({ 'Authorization': 'Bearer ' + token });
    let url: string = `${this.BASE_URL}/users`;

    return this.http.get(url, { headers: headers }).map(
      res => {
        var users = [];

        res.json().forEach((userData) => {
          var channels = [];
          var roles = [];
          userData.channels.forEach(channel => {
            var chan = new Channel(channel._id, channel.name, new Group(channel.groupId, ''));
            channels.push(chan);
          });

          userData.roles.forEach(role => {
            var rol = new Role(role._id, role.name);
            roles.push(rol);
          });
          var user = new User(userData._id, userData.username, userData.email, userData.password, channels, roles);
          users.push(user);
        })
        return users;
      },
      err => {
        return err;
      }
    ).toPromise();
  }

  editUser(id, email): Promise<any> {

    let token = localStorage.getItem('accessToken');
    let headers = new Headers({ 'Authorization': 'Bearer ' + token });
    let url: string = `${this.BASE_URL}/users`;
    const uploadData = new FormData();
    uploadData.append('_id', id);
    uploadData.append('email', email);

    return this.http.put(url, uploadData, { headers: headers }).map(
      res => {
        return res;
      },
      err => {
        return err;
      }
    ).toPromise();
  }

  addUser(username, email, password): Promise<any> {
    let token = localStorage.getItem('accessToken');
    let headers = new Headers({ 'Authorization': 'Bearer ' + token });
    let url: string = `${this.BASE_URL}/users`;
    const uploadData = new FormData();
    uploadData.append('username', username);
    uploadData.append('email', email);
    uploadData.append('password', password);

    return this.http.post(url, uploadData, { headers: headers }).map(
      res => {
        return res;
      },
      err => {
        return err;
      }
    ).toPromise();
  }

  deleteUser(id): Promise<any> {

    let token = localStorage.getItem('accessToken');
    let headers = new Headers({ 'Authorization': 'Bearer ' + token });
    let url: string = `${this.BASE_URL}/users/${id}`;

    return this.http.delete(url, { headers: headers }).map(
      res => {
        return res;
      },
      err => {
        return err;
      }
    ).toPromise();
  }

  getRoles(): Promise<any> {
    let token = localStorage.getItem('accessToken');
    let headers = new Headers({ 'Authorization': 'Bearer ' + token });
    let url: string = `${this.BASE_URL}/roles`;

    return this.http.get(url, { headers: headers }).map(
      res => {
        var roles = [];
        res.json().forEach((roleData) => {
          var role = new Role(roleData._id, roleData.name);
          roles.push(role);
        })
        return roles;
      },
      err => {
        return err;
      }
    ).toPromise();
  }

  saveRoles(id, roles): Promise<any> {
    let token = localStorage.getItem('accessToken');
    let headers = new Headers({ 'Authorization': 'Bearer ' + token });
    let url: string = `${this.BASE_URL}/users/saveRoles`;
    const uploadData = new FormData();
    uploadData.append('_id', id);
    uploadData.append('roles', JSON.stringify(roles));

    return this.http.post(url, uploadData, { headers: headers }).map(
      res => {
        return res;
      },
      err => {
        return err;
      }
    ).toPromise();
  }

  saveChannels(id, channels): Promise<any> {
    let token = localStorage.getItem('accessToken');
    let headers = new Headers({ 'Authorization': 'Bearer ' + token });
    let url: string = `${this.BASE_URL}/users/saveChannels`;
    const uploadData = new FormData();
    uploadData.append('_id', id);
    var selectedChannels = channels.map(item => ({ id: item.id }));
    uploadData.append('channels',  JSON.stringify(selectedChannels));

    return this.http.post(url, uploadData, { headers: headers }).map(
      res => {
        return res;
      },
      err => {
        return err;
      }
    ).toPromise();
  }

}
