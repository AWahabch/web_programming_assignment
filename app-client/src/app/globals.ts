// globals.ts
import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/Rx';
import {Group} from './models/group';
import {Channel} from './models/channel';


@Injectable()
export class Globals {
  public username: BehaviorSubject<string> = new BehaviorSubject<string>('anonymous');  
  public imageUrl: BehaviorSubject<string> = new BehaviorSubject<string>('assets/img/anonymous.jpg');  
  public currentChannelId: BehaviorSubject<string> = new BehaviorSubject<string>('');    
  public currentGroupId: BehaviorSubject<string> = new BehaviorSubject<string>('');   
  public hasSuperAdminPer: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);  
  public hasGroupAdminPer: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);  
}