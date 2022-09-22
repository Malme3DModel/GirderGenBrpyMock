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

    this.socket.on('a->b', (data: string) => {
      console.log("receive a message from a:", data);
    });

  }

  sendMessage(message: string) {
    this.socket.emit('b->a', message);
    console.log("send a message to b: ", message);
  }

  public disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      console.log('disconnect');
    }
  }

}
