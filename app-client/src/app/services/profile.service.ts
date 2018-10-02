import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from '../../environments/environment';

@Injectable()
export class ProfileService {

  private BASE_URL: string = environment.apiUrl;  
  constructor(private http: Http) { }

  uploadImage(file): Promise<any> {
    
    let token = localStorage.getItem('accessToken');
    let headers = new Headers({'Authorization'  :   'Bearer ' + token});
    let url: string = `${this.BASE_URL}/users/uploadImage`;
    const uploadData = new FormData();    
    uploadData.append('avatar', file);    

    return this.http.post(url, uploadData, {headers: headers}).map(
      res => {        
        return res
      },
      err => {
        return err;
      }
    ).toPromise();
  }

}
