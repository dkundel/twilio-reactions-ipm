import { Component } from '@angular/core';

import { environment } from '../environments/environment';
import { MessagingService } from './messaging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = environment.title;

  constructor(private messagingService: MessagingService) {
    this.messagingService.init();
  }
}
