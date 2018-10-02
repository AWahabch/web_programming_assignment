import { Component, OnInit, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { ChatService } from '../../../services/chat.service';
import { MessagesService } from '../../../services/messages.service';
import { ChannelsService } from '../../../services/channels.service';
import { Globals } from '../../../globals';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('chatBox') private myScrollContainer: ElementRef;
  private BASE_URL: string = environment.apiUrl;
  message: string;
  messages: any;
  currentChannelName: string = "Choose a channel to start your conversation";
  currentChannelId: string;
  currentUserId: string;
  currentUserInfo: any;
  rootImageUrl: string;

  constructor(
    private globals: Globals,
    private chatService: ChatService,
    private channelService: ChannelsService,
    private messagesService: MessagesService) {
    this.currentUserInfo = JSON.parse(localStorage.getItem('currentUserInfo'));
    this.currentUserId = this.currentUserInfo.id;
    this.globals.currentChannelId.subscribe(currentChannelId => {
      this.currentChannelId = currentChannelId;
      this.channelService.getChannelInfo(currentChannelId).then((res) => {
        this.currentChannelName = res.json().name;

      });

      this.messagesService.getHistory(this.currentChannelId).then((res) => {
        this.messages = res.json();
        var _a = this;
        setTimeout(function () {
          _a.scrollToBottom();
        }, 20);
      })
    });

  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  sendTextMessage() {
    this.currentUserInfo = JSON.parse(localStorage.getItem('currentUserInfo'));
    let messageWrapper = {
      userId: this.currentUserId,
      channelId: this.currentChannelId,
      type: "text",
      content: this.message,
      user: {}
    };
    this.chatService.sendMessage(JSON.stringify(messageWrapper));
    messageWrapper.user = {
      username: this.currentUserInfo.username,
      id: this.currentUserId,
      imageUrl: this.currentUserInfo.imageUrl
    };
    this.message = '';
    this.messages.push(messageWrapper);
    var _a = this;
        setTimeout(function () {
          _a.scrollToBottom();
    }, 20);
  }

  ngOnInit() {
    this.rootImageUrl = this.BASE_URL + '/users/image/';
    this.chatService.getMessages().subscribe((message) => {
      var msg = JSON.parse(message);
      if (msg.channel.channelId == this.currentChannelId){
        this.messages.push(msg);
        var _a = this;
          setTimeout(function () {
            _a.scrollToBottom();
        }, 20);
      }      
    });


    this.chatService.sendImageEvent.subscribe(imageBase64 => {
      this.currentUserInfo = JSON.parse(localStorage.getItem('currentUserInfo'));
      let messageWrapper = {
        userId: this.currentUserId,
        channelId: this.currentChannelId,
        type: "image",
        content: imageBase64,
        user: {}
      };
      this.chatService.sendMessage(JSON.stringify(messageWrapper));
      messageWrapper.user = {
        username: this.currentUserInfo.username,
        id: this.currentUserId,
        imageUrl: this.currentUserInfo.imageUrl
      };
      this.message = '';
      this.messages.push(messageWrapper);
      var _a = this;
        setTimeout(function () {
          _a.scrollToBottom();
      }, 20);
    });
  }

}
