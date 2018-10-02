import { Component, OnInit } from '@angular/core';
import { ChannelsService } from '../../../services/channels.service';
import { GroupsService } from '../../../services/groups.service';
import { Channel } from '../../../models/channel';
@Component({
  selector: 'app-channel-management',
  templateUrl: './channel-management.component.html',
  styleUrls: ['./channel-management.component.css']
})
export class ChannelManagementComponent implements OnInit {

  constructor(private channelsService: ChannelsService, private groupsService: GroupsService) { }

  channels = [];
  groups = [];
  channel = new Channel('', '', null);
  editting = false;
  ngOnInit() {
    this.loadGroups();
   
  }

  loadGroups() {
    this.groupsService.getGroups().then((res) => {
      this.groups = res;
      this.loadChannels();
    });
  }

  loadChannels() {
    this.channelsService.getChannels().then((res) => {
      this.channels = res;
      this.channel = new Channel('', '', this.groups[0]);
    });
  }

  edit(channel) {
    this.editting = true;
    this.channel = new Channel(channel.id, channel.name, channel.group);
  }

  onSave() {
    if (this.channel.id == '') {
      this.channelsService.addChannel(this.channel.name, this.channel.group.id).then((res) => {
        this.loadChannels();
      })
        .catch((err) => {
          alert(err);
        });
    }
    else {
      this.channelsService.editChannel(this.channel.id, this.channel.name, this.channel.group.id).then((res) => {
        this.loadChannels();
      })
        .catch((err) => {
          alert(err);
        });
    }
  }

  onDelete(id) {
    if (confirm('Are you sure want to delete this channel?')) {
      this.channelsService.deleteChannel(id).then((res) => {
        this.loadChannels();
      })
        .catch((err) => {
          alert(err);
        });
    }
  }

}
