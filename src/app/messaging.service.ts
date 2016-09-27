import { Injectable, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { Client, Channel } from 'twilio-ip-messaging';
import { AccessManager } from 'twilio-common';

// TEMPORARY HACKS
interface ITwilio {
  AccessManager(token: string): void;
  IPMessaging: {
    Client(accessManager: any): void
  }
}
declare const Twilio: ITwilio;
//

import 'rxjs/add/operator/toPromise';

import { environment } from '../environments/environment';

const CHANNEL_NAME = 'test-foo';

export interface StatsDictionary {
  [emoji: string]: number;
}

@Injectable()
export class MessagingService extends EventEmitter<string> {
  private client: Client;
  private channel: Channel;

  constructor(private http: Http) {
    super();
  }

  public init(): void {
    console.log('Helloooo');
    this.getToken()
      .then(token => this.createClient(token))
      .then(client => this.getOrCreateChannel(client))
      .then(ch => this.joinChannel(ch))
      .then(ch => this.setupListenersChannel(ch))
      .catch(err => {
        console.error('error', err);
      });
  }

  public sendMessage(message: string) {
    if (environment.availableEmojis.indexOf(message) !== -1 && this.channel) {
      this.channel.sendMessage(message);
    }
  }

  public getStats(): Promise<StatsDictionary> {
    return new Promise<StatsDictionary>((resolve, reject) => {
      let stats = {};
      environment.availableEmojis.forEach(e => {
        stats[e] = 0;
      });
      resolve(stats);
    });
  }

  private getToken(): Promise<string> {
    return this.http.get('/token').toPromise().then(resp => resp.json().token);
  }

  private createClient(token: string) {
    let accessManager = new Twilio.AccessManager(token) as AccessManager;
    this.client = new Twilio.IPMessaging.Client(accessManager) as Client;

    return this.client;
  }

  private getOrCreateChannel(client: Client) {
    return client.getChannelByUniqueName(CHANNEL_NAME)
      .then(channel => {
        if (channel) {
          return channel;
        } 
        return client.createChannel({
          uniqueName: CHANNEL_NAME
        });
      });
  }

  private joinChannel(channel: Channel) {
    return channel.join().then(() => {
      this.channel = channel;
      return channel;
    });
  }

  private setupListenersChannel(channel: Channel) {
    channel.on('messageAdded', message => {
      if (environment.availableEmojis.indexOf(message.body) !== -1) {
        this.emit(message.body);
      }
    });
  }
}
