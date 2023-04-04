import { Injectable, OnChanges, SimpleChanges } from '@angular/core';
import { Subject, retry } from 'rxjs';
import { Card } from './card.model';

interface guessEvaluation {
  evaluationText: string;
  staticCardIndex: number;
}
const CORRECT: string = 'CORRECT!';
const WRONG: string = 'WRONG!';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  rules: string[] = ['color', 'numberOfShapes', 'shape'];
  activeRule: string = '';
  turns: number = 0;
  gameStopper = new Subject<number>();
  guessEvaluation = new Subject<guessEvaluation>();
  turnWhenRuleExpires = 0;

  constructor() {}

  checkUserGuess(staticCard: Card, randomCard: Card, staticCardIndex: number) {
    console.log(`Active rule is ${this.activeRule}`);
    console.log(`Turn when rule expires is ${this.turnWhenRuleExpires}`);
    console.log(`Current turn is ${this.turns}`);

    if (
      this.activeRule === 'color' &&
      staticCard.colorOfForms === randomCard.colorOfForms
    ) {
      this.guessEvaluation.next({
        evaluationText: CORRECT,
        staticCardIndex: staticCardIndex,
      });
    } else if (
      this.activeRule === 'numberOfShapes' &&
      staticCard.numberOfShapes === randomCard.numberOfShapes
    ) {
      this.guessEvaluation.next({
        evaluationText: CORRECT,
        staticCardIndex: staticCardIndex,
      });
    } else if (
      this.activeRule === 'shape' &&
      staticCard.shapeOfForms === randomCard.shapeOfForms
    ) {
      this.guessEvaluation.next({
        evaluationText: CORRECT,
        staticCardIndex: staticCardIndex,
      });
    } else {
      this.guessEvaluation.next({
        evaluationText: WRONG,
        staticCardIndex: staticCardIndex,
      });
    }
    setTimeout(() => {
      this.guessEvaluation.next({
        evaluationText: '',
        staticCardIndex: -1,
      });
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
