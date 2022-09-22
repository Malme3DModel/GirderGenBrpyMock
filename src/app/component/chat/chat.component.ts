import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SocketioService } from './socketio-service.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  constructor(
    private socketService: SocketioService,
    public dialogRef: MatDialogRef<ChatComponent>) { }

  public comments: { user: boolean, content: string }[] = [
    { user: true, content: '１つ目のコメントです。' },
    { user: false, content: '２つ目のコメントです。' },
    { user: true, content: '３つ目のコメントです。' }
  ];

  public Message: string = '';

  ngOnInit(): void {
    this.socketService.setupSocketConnection();
  }

  ngOnDestroy() {
    this.socketService.disconnect();
  }

  public sendMessage(): void {
    this.socketService.sendMessage(this.Message + 'aaa');
  }

}
