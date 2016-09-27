import { Component, OnInit } from '@angular/core';

import { MessagingService, StatsDictionary } from '../messaging.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.css']
})
export class MobileComponent implements OnInit {
  availableEmojis: string[] = environment.availableEmojis;

  constructor(private messagingService: MessagingService) { }

  ngOnInit() {
  }

  send(emoji: string) {
    this.messagingService.sendMessage(emoji);
  }

}
