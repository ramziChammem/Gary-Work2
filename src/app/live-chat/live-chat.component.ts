import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { io } from 'socket.io-client';
const SOCKET_ENDPOINT = 'localhost:3000';
import { LiveMessages } from './live-chat.service';
@Component({
  selector: 'app-live-chat',
  templateUrl: './live-chat.component.html',
  styleUrls: ['./live-chat.component.scss'],
})
export class LiveChatComponent implements OnInit {
  socket;
  message = {
    messageBody: '',
    userId: '60535d734d756938fcb1d031',
    spId: '605eff787f19a604f461d987',
    isSp: !false,
  };
  allMsg: any = [];
  sendedMessages: any = [];
  recievedMessages: any = [];
  constructor(private LiveMessages: LiveMessages) {}

  ngOnInit() {
    this.setupSocketConnection();
    this.getAllMessages();
  }
  getAllMessages() {
    this.LiveMessages.getAllMessages().subscribe((data: any[]) => {
      this.allMsg = data;
      for (var i = 0; i < this.allMsg.length; i++) {
        this.allMsg[i].createdAt = moment()
          .add(this.allMsg[i].createdAt)
          .calendar();
      }
    });
  }

  setupSocketConnection() {
    this.socket = io(SOCKET_ENDPOINT);
    this.socket.on('message-broadcast', (data: string = this.allMsg) => {
      if (data) {
        this.getAllMessages();
      }
    });
  }
  SendMessage() {
    this.socket.emit('message', this.message.messageBody);

    this.LiveMessages.sendAMessage(this.message).subscribe((response) => {
      this.getAllMessages();
    });
    this.message.messageBody = '';
  }
  hideMessages() {
    document.getElementById('contt').style.display = 'none';
  }
}
