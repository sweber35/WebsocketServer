import { createServer, Server } from 'http';
import * as express from 'express';
import * as socketIO from 'socket.io';

import { Payload } from './packet';

export class PacketServer {

  public static readonly PORT: number = 8000;
  private app: express.Application;
  private server: Server;
  private io: socketIO.Server;
  private port: string | number;

  constructor() {
    this.createApp();
    this.config();
    this.createServer();
    this.sockets();
    this.listen();
  }

  private createApp(): void {
    this.app = express();
  }

  private createServer(): void {
    this.server = createServer(this.app);
  }

  private config(): void {
    this.port = process.env.PORT || PacketServer.PORT;
  }

  private sockets(): void {
    this.io = socketIO(this.server);
  }

  private listen(): void {
    this.server.listen(this.port, () => {
      console.log(`Running server on port ${this.port}`);
    });

    this.io.on('connect', (socket: any) => {
      console.log(`Connected client on port ${this.port}`);
      socket.on('message', (m: Payload) => {
        console.log(`[server] ${JSON.stringify(m)}`);
        this.io.emit('message', m);
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });
  }

  public getApp(): express.Application {
    return this.app;
  }

}
