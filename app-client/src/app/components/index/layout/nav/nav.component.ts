import { Component, OnInit } from '@angular/core';
import { Globals } from '../../../../globals';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  appName : string = 'Chatapp';  
  username : string = 'anonymous';
  constructor(private globals: Globals) { 
    this.globals.username.subscribe(username => {
      this.username = username;
    });
  }

  ngOnInit() {
    var currentUser = localStorage.getItem('currentUser');
    if(currentUser != null){
      this.username = currentUser    
    }
  }
}
