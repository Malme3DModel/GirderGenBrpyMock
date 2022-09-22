import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SocketioService } from './socketio-service.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  
  constructor(
    public socketService: SocketioService,
    public dialogRef: MatDialogRef<ChatComponent>) { }

  ngOnInit(): void {
    this.socketService.setupSocketConnection();
  }

  ngOnDestroy() {
    this.socketService.disconnect();
  }

  public sendMessage(Message : string): void {
    this.socketService.sendMessage(Message);
  }

}
