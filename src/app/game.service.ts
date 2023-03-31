import { Injectable, OnChanges, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { Card } from './card.model';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  rules: string[] = ['color', 'numberOfShapes', 'shape'];
  activeRule: string = '';
  turns: number = 0;
  gameStopper = new Subject<number>();
  turnWhenRuleExpires = 0;

  constructor() {}

  checkUserGuess(staticCard: Card, randomCard: Card) {
    if (
      this.activeRule === 'color' &&
      staticCard.colorOfForms === randomCard.colorOfForms
    ) {
      console.log('Good job!');
    }
    if (
      this.activeRule === 'numberOfShapes' &&
      staticCard.numberOfShapes === randomCard.numberOfShapes
    ) {
      console.log('Good job!');
    }
    if (
      this.activeRule === 'shape' &&
      staticCard.shapeOfForms === randomCard.shapeOfForms
    ) {
      console.log('Good job!');
    }
  }

  checkRuleExpiration() {
    if (this.turns === this.turnWhenRuleExpires) {
      this.creatRuleAndTurn();
    }
    this.turns++;
    this.gameStopper.next(this.turns);
  }

  private creatRuleAndTurn() {
    this.activeRule = this.rules[this.getRandomNumberForRule()];
    this.turnWhenRuleExpires = this.turns + this.getRandomNumberForRuleRounds();
  }

  private getRandomNumberForRule(): number {
    return Math.floor(Math.random() * 3);
  }

  private getRandomNumberForRuleRounds(): number {
    return Math.floor(Math.random() * 3) + 4;
  }
}
