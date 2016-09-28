// TEMPORARY HACKS
// The TypeScript Definitions for 'twilio-ip-messaging' and
// 'twilio-common' are currently in development.
// They are currently not exposing the global interface and
// this makes sure to polyfill this.
interface ITwilio {
  AccessManager(token: string): void;
  IPMessaging: {
    Client(accessManager: any): void
  }
}
declare const Twilio: ITwilio;
// END OF TEMPORARY HACKS

import { Injectable, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { Client, Channel, Message, Paginator } from 'twilio-ip-messaging';
import { AccessManager } from 'twilio-common';

import 'rxjs/add/operator/toPromise';

import { environment } from '../environments/environment';

const CHANNEL_NAME = 'general';

export interface StatsDictionary {
  [emoji: string]: number;
}

@Injectable()
export class MessagingService extends EventEmitter<string> {
  private client: Client;
  private channel: Channel;
  private stats: StatsDictionary;
  private channelSetupEmitter: EventEmitter<Channel> = new EventEmitter();

  constructor(private http: Http) {
    super();
  }

  public init(): Promise<Channel> {
    return this.getToken()
      .then(token => this.createClient(token))
      .then(client => this.getOrCreateChannel(client))
      .then(ch => this.joinChannel(ch))
      .then(ch => this.setupListenersChannel(ch))
      .catch(err => {
        console.error('error', err);
      });
  }

  public getChannelEmitter() {
    return this.channelSetupEmitter;
  }

  public sendMessage(message: string) {
    if (environment.availableEmojis.indexOf(message) !== -1 && this.channel) {
      this.channel.sendMessage(message);
    }
  }

  public getStats(): Observable<StatsDictionary> {
    if (!this.channel) {
      return null;
    }

    return new Observable(subscriber => {
      this.getWholeHistoryStats(this.channel, subscriber);
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

    this.channelSetupEmitter.emit(channel);

    return channel;
  }

  private getWholeHistoryStats(channel: Channel, subscriber: Subscriber<StatsDictionary>): Promise<StatsDictionary> {
    return new Promise((resolve, reject) => {
      this.stats = {};
      let promiseLoop = (page) => {
        return this.getPagedContent(page, subscriber).then(p => {
          if (p) {
            return promiseLoop(p);
          } else {
            subscriber.next(this.stats);
            subscriber.complete();
            resolve(this.stats);
          }
        })
      }

      channel.getMessagesPaged(200).then(page => {
        promiseLoop(page);
      });
    });
  }

  private getPagedContent(page: Paginator<Message>, subscriber: Subscriber<StatsDictionary>) {
    this.extractStats(page.items);
    subscriber.next(this.stats);
    if (page.hasPrevPage) {
      return page.prevPage();
    } else {
      return Promise.resolve(null);
    }
  }

  private extractStats(messages: Message[]): void {
    messages.forEach(msg => {
      if (this.stats[msg.body]) {
        this.stats[msg.body]++;
      } else {
        this.stats[msg.body] = 1;
      }
    });
  }
}
