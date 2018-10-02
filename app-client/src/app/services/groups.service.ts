import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from '../../environments/environment';
import { Group } from '../models/group';
import { Channel } from '../models/channel';
@Injectable()
export class GroupsService {

  private BASE_URL: string = environment.apiUrl;
  constructor(private http: Http) { }

  getGroups(): Promise<any> {
    let token = localStorage.getItem('accessToken');
    let headers = new Headers({ 'Authorization': 'Bearer ' + token });
    let url: string = `${this.BASE_URL}/groups`;

    return this.http.get(url, { headers: headers }).map(
      res => {
        var groups = [];
        res.json().forEach((groupData) => {
          var channels = [];
          groupData.channels.forEach((channelData) => {
            var channel = new Channel(channelData._id, channelData.name, null);
            channels.push(channel);
          });
          var group = new Group(groupData._id, groupData.name, channels);
          groups.push(group);
        })
        return groups;
      },
      err => {
        return err;
      }
    ).toPromise();
  }

  addGroup(name): Promise<any> {
    let token = localStorage.getItem('accessToken');
    let headers = new Headers({ 'Authorization': 'Bearer ' + token });
    let url: string = `${this.BASE_URL}/groups`;
    const data = new FormData();
    data.append('name', name);

    return this.http.post(url, data, { headers: headers }).map(
      res => {
        return res;
      },
      err => {
        return err;
      }
    ).toPromise();
  }

  editGroup(id, name): Promise<any> {

    let token = localStorage.getItem('accessToken');
    let headers = new Headers({ 'Authorization': 'Bearer ' + token });
    let url: string = `${this.BASE_URL}/groups`;
    const uploadData = new FormData();
    uploadData.append('_id', id);
    uploadData.append('name', name);

    return this.http.put(url, uploadData, { headers: headers }).map(
      res => {
        return res;
      },
      err => {
        return err;
      }
    ).toPromise();
  }

  deleteGroup(id): Promise<any> {

    let token = localStorage.getItem('accessToken');
    let headers = new Headers({ 'Authorization': 'Bearer ' + token });
    let url: string = `${this.BASE_URL}/groups/${id}`;

    return this.http.delete(url, { headers: headers }).map(
      res => {
        return res;
      },
      err => {
        return err;
      }
    ).toPromise();
  }
}
