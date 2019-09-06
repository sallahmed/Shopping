import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material';
import { MessagesService } from './messages.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ MessagesService ]
})
export class MessagesComponent implements OnInit {
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  public selectedTab:number=1;
  //public messages:Array<Object>;
  public messages: any;
  public files:Array<Object>;
  public meetings:Array<Object>;
  public notifications: any;
  constructor(private messagesService: MessagesService) {
    //this.messages = messagesService.getMessages();
    this.files = messagesService.getFiles();
    this.meetings = messagesService.getMeetings();
    //this.notifications = this.messagesService.getNotifications();
    this.messagesService.getNotifications().subscribe(data => /*this.notifications*/this.messages = data);
  }

  ngOnInit() {
      //this.messagesService.getNotifications().subscribe(data => this.notifications = data);
  }

  openMessagesMenu() {
    this.trigger.openMenu();
    this.selectedTab = 0;
  }

  onMouseLeave(){
    this.trigger.closeMenu();
  }

  stopClickPropagate(event: any){
    event.stopPropagation();
    event.preventDefault();
  }

}
