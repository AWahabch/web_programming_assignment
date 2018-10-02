import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Channel } from '../models/channel';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from '../../environments/environment';
import { Globals } from '../globals';
import { Group } from '../models/group';

@Injectable()
export class ChannelsService {

  private BASE_URL: string = environment.apiUrl;
  constructor(private http: Http, private globals: Globals) { }
  list(group): Promise<any> {

    let token = localStorage.getItem('accessToken');
    let headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + token
    });
    let url = `${this.BASE_URL}/channels/group/${group.id}`;

    return this.http.get(url, { headers: headers }).map(
      res => {
        var channels = [];
        res.json().forEach((channelData) => {
          var channel = new Channel(channelData._id, channelData.name, group);
          channels.push(channel);
        })
        return channels;
      },
      err => {
        return err;
      }
    ).toPromise();
  }

  getChannels(): Promise<any> {
    let token = localStorage.getItem('accessToken');
    let headers = new Headers({ 'Authorization': 'Bearer ' + token });
    let url: string = `${this.BASE_URL}/channels`;

    return this.http.get(url, { headers: headers }).map(
      res => {
        var channels = [];
        res.json().forEach((channelData) => {
          var group = new Group(channelData.groupId, channelData.groupName);
          var channel = new Channel(channelData._id, channelData.name, group);
          channels.push(channel);
        })
        return channels;
      },
      err => {
        return err;
      }
    ).toPromise();
  }

  getChannelInfo(id): Promise<any> {
    let token = localStorage.getItem('accessToken');
    let headers = new Headers({ 'Authorization': 'Bearer ' + token });
    let url: string = `${this.BASE_URL}/channels/info/${id}`;

    return this.http.get(url, { headers: headers }).map(
      res => {        
        return res;
      },
      err => {
        return err;
      }
    ).toPromise();
  }

  addChannel(name, groupId): Promise<any> {
    let token = localStorage.getItem('accessToken');
    let headers = new Headers({ 'Authorization': 'Bearer ' + token });
    let url: string = `${this.BASE_URL}/channels`;
    const data = new FormData();
    data.append('name', name);
    data.append('groupId', groupId);

    return this.http.post(url, data, { headers: headers }).map(
      res => {
        return res;
      },
      err => {
        return err;
      }
    ).toPromise();
  }

  editChannel(id, name, groupId): Promise<any> {

    let token = localStorage.getItem('accessToken');
    let headers = new Headers({ 'Authorization': 'Bearer ' + token });
    let url: string = `${this.BASE_URL}/channels`;
    const uploadData = new FormData();
    uploadData.append('_id', id);
    uploadData.append('name', name);
    uploadData.append('groupId', groupId);

    return this.http.put(url, uploadData, { headers: headers }).map(
      res => {
        return res;
      },
      err => {
        return err;
      }
    ).toPromise();
  }

  deleteChannel(id): Promise<any> {

    let token = localStorage.getItem('accessToken');
    let headers = new Headers({ 'Authorization': 'Bearer ' + token });
    let url: string = `${this.BASE_URL}/channels/${id}`;

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


