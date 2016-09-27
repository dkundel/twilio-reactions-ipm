import { Component, OnInit } from '@angular/core';

import { MessagingService, StatsDictionary } from '../messaging.service';
import { environment } from '../../environments/environment';

interface EmojiEntry {
  value: string;
  position: string;
}

const DISAPPEARING_TIME = 8 * 1000;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  emojis: EmojiEntry[] = [];
  stats: StatsDictionary = {};
  availableEmojis: string[] = environment.availableEmojis;

  constructor(private messagingService: MessagingService) { }

  ngOnInit() {
    this.messagingService.getStats().then(stats => {
      this.stats = stats;
    });

    this.messagingService.subscribe(msg => {
      this.add(msg);
    });
  }

  add(value: string) {
    let position: string = `${Math.floor(Math.random() * 100)}%`;
    this.emojis.push({value, position});
    this.stats[value]++;
    setTimeout(() => this.emojis.splice(0, 1), DISAPPEARING_TIME);
  }
}
