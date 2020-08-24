import { Component, OnInit, Input } from '@angular/core';

import { Story } from '../../model/story';

@Component({
  selector: 'app-story-card',
  templateUrl: './story-card.component.html',
  styleUrls: ['./story-card.component.css'],
})
export class StoryCardComponent implements OnInit {
  @Input() story: Story;
  @Input() index: number = 0;
  @Input() startingIndex: number = 0;
  constructor() {}

  ngOnInit(): void {}

  openLink(url: string) {
    if (url) {
      window.open(url);
    }
  }

  getHostname(url: string) {
    return new URL(url).hostname;
  }
}
