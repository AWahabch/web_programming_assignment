import { Component, OnInit } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { ProfileService } from '../../../services/profile.service';
import { environment } from '../../../../environments/environment';
import { Globals } from '../../../globals';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  private BASE_URL: string = environment.apiUrl;
  selectedFile: File;
  selectedFileName: string = '';
  loadedImage: boolean = false;
  selectImageButtonLabel: string = 'Select Image';
  selectImageButtonClass: string = 'btn btn-info center-button';
  message = '';
  messageClass = '';
  imageProfile = 'assets/img/anonymous.jpg'
  constructor(private profileService: ProfileService, private globals: Globals) { 
    this.globals.imageUrl.subscribe(imageUrl => {
      this.imageProfile = imageUrl;
    });
  }

  ngOnInit() {
  }

  onFileChanged(event) {
    var fileType = event.target.files[0]["type"];
    // Check for valid files
    var validImageTypes = ["image/gif", "image/jpeg", "image/png"];
    if (validImageTypes.includes(fileType)) {
      this.selectedFile = event.target.files[0];
      this.selectedFileName = event.target.files[0].name;
      this.loadedImage = true;
      this.selectImageButtonLabel = 'Select Other image';
      this.selectImageButtonClass = 'btn btn-warning'
      if (this.selectedFileName.length > 15) {
        this.message = 'File ' + this.selectedFileName.slice(0, 6) + '...' + this.selectedFileName.slice(-9) + ' selected';
      } else {
        this.message = 'File ' + this.selectedFileName.slice(-18) + ' selected';
      }
      this.messageClass = 'alert alert-success message';
    } else {
      this.messageClass = 'alert alert-danger message';
      this.message = 'Invalid file';
    }
  }

  onUpload() {
    this.profileService.uploadImage(this.selectedFile).then((res) => {
      this.messageClass = 'alert alert-success message';
      this.message = 'Your avatar has been changed successfully';
      this.imageProfile = this.BASE_URL + '/users/image/' + res.json()["imageUrl"];
      var currentUserInfo = JSON.parse(localStorage.getItem('currentUserInfo'));
      currentUserInfo.imageUrl =  res.json()["imageUrl"];
      localStorage.setItem("currentUserInfo", JSON.stringify(currentUserInfo));
      this.globals.imageUrl.next(this.imageProfile);
    })
      .catch((err) => {
        this.messageClass = 'alert alert-danger message';
        this.message = 'File too large, choose smaller file (maximum size is 1Mb)';
      });

  }
}
