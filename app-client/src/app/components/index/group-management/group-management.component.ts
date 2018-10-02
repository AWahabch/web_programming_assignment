import { Component, OnInit } from '@angular/core';
import { GroupsService } from '../../../services/groups.service';
import { Group } from '../../../models/group';
@Component({
  selector: 'app-group-management',
  templateUrl: './group-management.component.html',
  styleUrls: ['./group-management.component.css']
})
export class GroupManagementComponent implements OnInit {
  groups = [];
  group = new Group('', '');
  editting = false;
  constructor(private groupsService: GroupsService) { }

  ngOnInit() {
    this.loadGroups();
  }

  loadGroups() {
    this.groupsService.getGroups().then((res) => {
      this.groups = res;
      this.editting = false;
      this.group = new Group('', '');
    });
  }

  edit(group) {
    this.editting = true;
    this.group = new Group(group.id, group.name);
  }

  onSave() {
    if (this.group.id == '') {
      this.groupsService.addGroup(this.group.name).then((res) => {
        this.loadGroups();
      })
        .catch((err) => {
          alert(err);
        });
    }
    else {
      this.groupsService.editGroup(this.group.id, this.group.name).then((res) => {
        this.loadGroups();
      })
        .catch((err) => {
          alert(err);
        });
    }
  }

  onDelete(id) {
    if (confirm('Are you sure want to delete this group?')) {
      this.groupsService.deleteGroup(id).then((res) => {
        this.loadGroups();
      })
        .catch((err) => {
          alert(err);
        });
    }
  }

}
