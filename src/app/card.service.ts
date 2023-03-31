import { Injectable } from '@angular/core';
import { Card } from './card.model';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private colors = ['red', 'green', 'blue', 'yellow'];
  private shapes = ['circle', 'triangle', 'square', 'star'];
  private template = '';

  firstRandomCard: Card = new Card(
    this.colors[this.getRandomNumber() - 1],
    this.getRandomNumber(),
    this.shapes[this.getRandomNumber() - 1]
  );
  randomCardSubject = new BehaviorSubject<Card>(this.firstRandomCard);
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

    const randomCard = new Card(
      this.colors[this.getRandomNumber() - 1],
      numberOfShapes,
      this.shapes[this.getRandomNumber() - 1],
      templates
    );
    this.randomCardSubject.next(randomCard);
  }

  private getRandomNumber(): number {
    return Math.floor(Math.random() * 4) + 1;
  }
}
