import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../../services/chat.service';

@Component({
  selector: 'app-send-image',
  templateUrl: './send-image.component.html',
  styleUrls: ['./send-image.component.css']
})
export class SendImageComponent implements OnInit {

  selectedFile: File;
  selectedFileName: string = '';
  loadedImage: boolean = false;
  selectImageButtonLabel: string = 'Select Image';
  selectImageButtonClass: string = 'btn btn-info center-button';
  message = '';
  messageClass = '';
  constructor(private chatService: ChatService) { }

  ngOnInit() {
  }

  onFileChanged(event) {
    var fileType = event.target.files[0]["type"];
    // Check for valid files
    var validImageTypes = ["image/gif", "image/jpeg", "image/png"];
    if (validImageTypes.includes(fileType)) {
      this.selectedFile = event.target.files[0];
      this.selectedFileName = this.selectedFile.name;
      this.loadedImage = true;
      this.selectImageButtonLabel = 'Select Other image';
      this.selectImageButtonClass = 'btn btn-warning'
      if (this.selectedFileName.length > 15) {
        this.message = 'File ' + this.selectedFileName.slice(0, 6) + '...' + this.selectedFileName.slice(-9) + ' selected';
      } else {
        this.message = 'File ' + this.selectedFileName.slice(-18) + ' selected';
      }
      this.messageClass = 'alert alert-success message';
    }else {
      this.messageClass = 'alert alert-danger message';
      this.message = 'Invalid file';
    }
  }

  onUpload() {
    this.sendBase64(this.selectedFile);
  }

  sendBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    var _this = this;
    reader.onload = function () {
      _this.chatService.sendImage(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }


}
