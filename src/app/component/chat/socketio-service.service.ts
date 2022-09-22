import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  public socket: any;

  constructor() {}

  public setupSocketConnection() {

    console.log('setupSocketConnection:', environment.SOCKET_ENDPOINT);

    this.socket = io(environment.SOCKET_ENDPOINT);

    this.socket.on('HelpDesk->Customer', (data: string) => {
      console.log("receive a message from HelpDesk:", data);
    });

  }

  sendMessage(message: string) {
    this.socket.emit('Customer->HelpDesk', message);
    console.log("send a message to HelpDesk: ", message);
  }

  public disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      console.log('disconnect');
    }
  }

}
