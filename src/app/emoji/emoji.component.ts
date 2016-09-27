import { Component, Input, OnInit, HostBinding } from '@angular/core';

declare const emojione;

@Component({
  selector: 'app-emoji',
  templateUrl: './emoji.component.html',
  styleUrls: ['./emoji.component.css']
})
export class EmojiComponent implements OnInit {
  @Input() shortname: string = '';

  @HostBinding('innerHTML') emojiHtml: string = ''; 

  constructor() { }

  ngOnInit() {
    this.emojiHtml = emojione.toImage(this.shortname).replace(/png/g, 'svg');
  }

}
