import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'beat-the-beep-outta-the-cat';
  items;
  totalDeck = 3;
  gridNumber: number;
  hidden = true;
  winCount = 0;
  showModal = false;
  content = '';

  constructor(private appTitle: Title) {
    this.appTitle.setTitle('Beat The Beep Outta The Cat!');
  }

  ngOnInit(): void {
    this.items = Array.from(Array(this.totalDeck * this.totalDeck), (_, i) => i + 1);
    this.randomNumberGenerator();
  }

  randomNumberGenerator(): void {
    this.hidden = false;
    this.gridNumber = Math.floor(Math.random() * (this.totalDeck * this.totalDeck)) + 1;
  }

  checkClick(hidden): void {
    if (!hidden) {
      this.show();
    }
  }

  catClicked(item): void {
    if (item === this.gridNumber) {
      this.winCount++;
    }
  }

  show(): void {
    this.showModal = true;
    this.content = 'You killed ' + (this.winCount === 0 ? 'NO cats! Big Whoop!' : (this.winCount === 1 ? ' 1 cat! *_* Meh!'
      : this.winCount + ' cats! Hurray! '));
    this.title = 'You Loooooooooooooooooooose!!';
  }

  hide(): void {
    this.showModal = false;
    this.winCount = 0;
  }

}
