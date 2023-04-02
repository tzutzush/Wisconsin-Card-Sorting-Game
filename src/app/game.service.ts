import { Injectable, OnChanges, SimpleChanges } from '@angular/core';
import { Subject, retry } from 'rxjs';
import { Card } from './card.model';

const CORRECT: string = 'Correct!';
const WRONG: string = 'Wrong!';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  rules: string[] = ['color', 'numberOfShapes', 'shape'];
  activeRule: string = '';
  turns: number = 0;
  gameStopper = new Subject<number>();
  guessEvaluation = new Subject<string>();
  turnWhenRuleExpires = 0;

  constructor() {}

  checkUserGuess(staticCard: Card, randomCard: Card) {
    console.log(`Active rule is ${this.activeRule}`);
    console.log(`Turn when rule expires is ${this.turnWhenRuleExpires}`);
    console.log(`Current turn is ${this.turns}`);

    if (
      this.activeRule === 'color' &&
      staticCard.colorOfForms === randomCard.colorOfForms
    ) {
      this.guessEvaluation.next(CORRECT);
    } else if (
      this.activeRule === 'numberOfShapes' &&
      staticCard.numberOfShapes === randomCard.numberOfShapes
    ) {
      this.guessEvaluation.next(CORRECT);
    } else if (
      this.activeRule === 'shape' &&
      staticCard.shapeOfForms === randomCard.shapeOfForms
    ) {
      this.guessEvaluation.next(CORRECT);
    } else {
      this.guessEvaluation.next(WRONG);
    }
    setTimeout(() => {
      this.guessEvaluation.next('');
    }, 2000);
  }

  checkRuleExpiration() {
    if (this.turns === this.turnWhenRuleExpires) {
      this.creatRuleAndTurn();
    }
    this.turns++;
    this.gameStopper.next(this.turns);
  }

  private creatRuleAndTurn() {
    if (!this.activeRule) {
      this.activeRule = this.rules[this.getRandomNumberForRule()];
    } else {
      const inactiveRules: string[] = this.rules.filter(
        (rule) => this.activeRule !== rule
      );
      console.log(inactiveRules);

      this.activeRule = inactiveRules[this.getRandomNumberForRule()];
    }

    this.turnWhenRuleExpires = this.turns + 6;
  }

  private getRandomNumberForRule(): number {
    return Math.floor(Math.random() * 2);
  }
}
