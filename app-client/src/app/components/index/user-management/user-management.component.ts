import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { ChannelsService } from '../../../services/channels.service';
import { User } from '../../../models/user';
import { Role } from '../../../models/role';
import { FormControl } from '@angular/forms';
import { Globals } from '../../../globals';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  users = [];

  user = new User('', '', '', '');
  editting = false;
  channels = [];
  selectedChannels = [];
  channelDropdownSetting = {};

  roles = [];
  selectedRoles = [];
  roleDropdownSetting = {};
  hasSuperAdminPer = false;
  constructor(private globals: Globals, private usersService: UsersService, private channelsService: ChannelsService) { }

  ngOnInit() {
    this.globals.hasSuperAdminPer.subscribe(hasSuperAdminPer => {
      this.hasSuperAdminPer = hasSuperAdminPer;
    });

    this.loadChannels();
    this.selectedChannels = [];
    this.channelDropdownSetting = {
      singleSelection: false,
      text: "Select Channels",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      labelKey: "name",
      primaryKey: "id",
      classes:"myclass custom-class"
    };
    this.selectedRoles = [];
    this.roleDropdownSetting = {
      singleSelection: false,
      text: "Select Roles",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      labelKey: "name",
      primaryKey: "id",
      classes:"myclass custom-class"
    };
  }

  loadChannels() {
    this.channelsService.getChannels().then((res) => {
      this.channels = res;
      this.loadRoles();
    });
  }

  loadRoles() {
    this.usersService.getRoles().then((res) => {
      this.roles = res;
      this.loadUsers();
    });
  }

  loadUsers() {
    this.usersService.getUsers().then((res) => {
      this.users = res;
      this.user = new User('', '', '', '');
      this.editting = false;
      this.selectedChannels =[];
      this.selectedRoles = [];
    });
  }

  edit(user) {
    this.editting = true;
    this.user = new User(user.id, user.username, user.email, user.password, user.channels);
    this.selectedChannels = user.channels;
    this.selectedRoles = user.roles;
  }

  onSave() {
    if (this.user.id == '') {
      this.usersService.addUser(this.user.username, this.user.email, this.user.password).then((res) => {
        this.onSaveChannels();
      })
        .catch((err) => {
          alert(err);
        });
    }
    else {
      this.usersService.editUser(this.user.id, this.user.email).then((res) => {
        this.onSaveChannels();
      })
        .catch((err) => {
          alert(err);
        });
    }
  }

  onSaveChannels(){
    this.usersService.saveChannels(this.user.id, this.selectedChannels).then((res) => {
      this.onSaveRoles();
    })
      .catch((err) => {
        alert(err);
      });
  }

  onSaveRoles(){
    this.usersService.saveRoles(this.user.id, this.selectedRoles).then((res) => {
      this.loadUsers();
    })
      .catch((err) => {
        alert(err);
      });
  }

  onDelete(id) {
    if (confirm('Are you sure want to delete this user?')) {
      this.usersService.deleteUser(id).then((res) => {
        this.loadUsers();
      })
        .catch((err) => {
          alert(err);
        });
    }
  }


}
