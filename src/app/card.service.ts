import { Injectable } from '@angular/core';
import { Card } from './card.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private colors = ['red', 'green', 'blue', 'yellow'];
  private shapes = ['circle', 'triangle', 'square', 'star'];
  private template = '';

  randomCardObservable = new Observable<Card>();
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

    return new Card(
      this.colors[this.getRandomNumber() - 1],
      numberOfShapes,
      this.shapes[this.getRandomNumber() - 1],
      templates
    );
  }

  private getRandomNumber(): number {
    return Math.floor(Math.random() * 4) + 1;
  }
}

// function createRandomCard() {
//   const formArray: never[] = [];
//   const card = { color: 'red', number: 4, form: 'circle', forms: formArray };
// }

// const card = { color: 'red', number: 4, form: 'circle', forms: ['template'] };
