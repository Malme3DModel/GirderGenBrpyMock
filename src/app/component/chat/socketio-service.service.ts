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

    console.log('setupSocketConnection', environment.SOCKET_ENDPOINT);

    this.socket = io(environment.SOCKET_ENDPOINT);

    this.socket.on('my broadcast', (data: string) => {
      console.log(data);
    });

  }

  public disconnect() {
    console.log('disconnect', 'calling');
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  sendMessage(message: string) {
    this.socket.emit('my message', message);
    console.log("this.socket.emit('my message', message);");
  }


}
