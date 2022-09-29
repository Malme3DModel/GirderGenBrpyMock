import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  public socket: any;

  public comments: { user: boolean, content: string }[] = [
    { user: false, content: 'ご質問はございますか？' }
  ];

  constructor() {}

  // socket と 接続する
  public setupSocketConnection() {

    console.log('setupSocketConnection:', environment.SOCKET_ENDPOINT);

    this.socket = io(environment.SOCKET_ENDPOINT);

    // ヘルプディスクからのメッセージを受け取る
    this.socket.on('HelpDesk->Customer', (data: string) => {
      if(data == null)
        return;
      if(data.trim().length ===0)
        return;

      this.comments.push({ user: false, content: data });

      console.log("receive a message from HelpDesk:", data);
    });

  }

  // ヘルプディスクにメッセージを送る
  public sendMessage(message: string) {

    if(message == null)
      return;
    if(message.trim().length ===0)
      return;
    
    this.socket.emit('Customer->HelpDesk', message);

    this.comments.push({ user: true, content: message });

    console.log("send a message to HelpDesk: ", message);
  }


  // socket から切断する
  public disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      console.log('disconnect');
    }
  }

}
