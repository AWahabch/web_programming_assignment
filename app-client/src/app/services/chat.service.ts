import { Injectable, Output } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { EventEmitter } from '@angular/core';

@Injectable()
export class ChatService {

  private socket;  
  private imageBase64;

  constructor() {
    this.socket = io(environment.socketUrl);
  }

  public sendMessage(message) {
    this.socket.emit('message', message);
  }

  public getMessages = () => {
    return Observable.create((observer) => {
        this.socket.on('message', (message) => {
            observer.next(message);
        });
    });
  }

  @Output() sendImageEvent: EventEmitter<string> = new EventEmitter();

  public sendImage(image) {
    this.imageBase64 = image;
    this.sendImageEvent.emit(this.imageBase64);
  }

}
