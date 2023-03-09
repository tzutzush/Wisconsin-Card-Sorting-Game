import { Injectable } from '@angular/core';
import { Card } from './card.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private colors = ['red', 'green', 'blue', 'yellow'];
  private shapes = ['circle', 'triangle', 'square', 'star'];
  private template = '';

  randomCardSubject = new Subject<Card>();
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
    const numberOfShapes = this.getRandomNumber();
    const templates = Array.from(
      new Array(numberOfShapes),
      (item: string) => item || this.template
    );
    console.log(templates);

    const randomCard = new Card(
      this.colors[this.getRandomNumber() - 1],
      numberOfShapes,
      this.shapes[this.getRandomNumber() - 1],
      templates
    );
    this.randomCardSubject.next(randomCard);
    return randomCard;
  }

  private getRandomNumber(): number {
    return Math.floor(Math.random() * 4) + 1;
  }
}
