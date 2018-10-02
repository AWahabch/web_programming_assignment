import { Component, OnInit } from '@angular/core';
import { Channel } from '../../../../models/channel'
import { Group } from '../../../../models/group'
import { environment } from '../../../../../environments/environment';
import { Globals } from '../../../../globals';
import { GroupsService } from '../../../../services/groups.service';
import { ChannelsService } from '../../../../services/channels.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  private BASE_URL: string = environment.apiUrl;
  groups = [];
  currentChannelId;
  currentGroupId;
  username;
  imageProfile;
  hasGroupAdminPer;

  constructor(
    private globals: Globals,
    private groupService: GroupsService) {
    var currentUser = localStorage.getItem('currentUser');
    if(currentUser != null){
      this.username = currentUser    
    }
    this.globals.imageUrl.subscribe(imageUrl => {
      this.imageProfile = imageUrl;
    });
    this.globals.hasGroupAdminPer.subscribe(hasGroupAdminPer => {
      this.hasGroupAdminPer = hasGroupAdminPer;
    });
    this.globals.currentGroupId.subscribe(currentGroupId => {
      this.currentGroupId = currentGroupId;
    });
    this.globals.currentChannelId.subscribe(currentChannelId => {
      this.currentChannelId = currentChannelId;
    });
    this.globals.currentGroupId.next(localStorage.getItem('currentGroupId'));
    this.globals.currentChannelId.next(localStorage.getItem('currentChannelId'));
  }

  ngOnInit() {
    this.groupService.getGroups().then((res) => {        
        this.groups = res;
    })  
  }

  chooseChannel(groupId, channelId){
    this.currentGroupId = groupId;
    this.currentChannelId = channelId;
    this.globals.currentGroupId.next(this.currentGroupId);
    this.globals.currentChannelId.next(this.currentChannelId);
    localStorage.setItem('currentGroupId', this.currentGroupId);
    localStorage.setItem('currentChannelId', this.currentChannelId);
  }

  testData() {
    var group1 = new Group('5badb1d24f08141720984d42', 'Sport Group');
    var group2 = new Group('5badb2fb4f08141720984d43', 'Learning Group');
    var group3 = new Group('5badb36c4f08141720984d44', 'Hobbies Group');
    var group4 = new Group('5badb3974f08141720984d45', 'Video Games Group');
    var channels1 = [
      new Channel('5badb4074f08141720984d46', 'Rugby', group1),
      new Channel('5badb42e4f08141720984d47', 'Soccer', group1),
      new Channel('5badb44b4f08141720984d48', 'Basketball', group1),
    ];
    var channels2 = [
      new Channel('g2c1', 'Deep Learning', group2),
      new Channel('g2c2', 'Web Programming', group2),
      new Channel('g2c3', 'Perceptual Computing', group2),
    ];
    var channels3 = [
      new Channel('5badb4d74f08141720984d4b', 'Cinema', group3),
      new Channel('5badb4ff4f08141720984d4d', 'Surfing', group3),
      new Channel('5badb5054f08141720984d4e', 'Shooting', group3),
    ];
    var channels4 = [
      new Channel('g4c1', 'FPS games', group4),
      new Channel('g4c2', 'MOBA games', group4),
      new Channel('g4c3', 'RPG games', group4),
    ];
    group1.channels = channels1;
    group2.channels = channels2;
    group3.channels = channels3;
    group4.channels = channels4;
    this.groups = [group1, group2, group3, group4];
  }

}
