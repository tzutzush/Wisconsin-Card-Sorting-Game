import { Injectable } from '@angular/core';
import { Card } from './card.model';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private colors = ['red', 'green', 'blue', 'yellow'];

  private shapes = ['circle', 'triangle', 'square', 'star'];
  constructor() {}

  createStaticCards() {
    return [
      new Card(this.colors[0], 1, this.shapes[0]),
      new Card(this.colors[1], 2, this.shapes[1]),
      new Card(this.colors[2], 3, this.shapes[2]),
      new Card(this.colors[3], 4, this.shapes[3]),
    ];
  }

  createRandomCard() {
    return new Card(
      this.colors[this.getRandomNumber()],
      this.getRandomNumber(),
      this.shapes[this.getRandomNumber()]
    );
  }

  private getRandomNumber(): number {
    return Math.floor(Math.random() * 4) + 1;
  }
}
