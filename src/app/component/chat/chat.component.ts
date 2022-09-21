import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ChatComponent>) { }

  ngOnInit(): void {
  }

  comments: { user: boolean, content: string }[] = [
    { user: true,  content: '１つ目のコメントです。'},
    { user: false,  content: '２つ目のコメントです。'},
    { user: true,  content: '３つ目のコメントです。'}
  ];

}
