import { Injectable, OnChanges, SimpleChanges } from '@angular/core';
import { Subject, retry } from 'rxjs';
import { Card } from './card.model';
import { TimerService } from './timer.service';

interface guessEvaluation {
  evaluationText: string;
  staticCardIndex: number;
}

@Injectable({
  providedIn: 'root',
})
export class GameService {
  rules: string[] = ['color', 'numberOfShapes', 'shape'];
  activeRule: string = '';
  turns: number = 0;
  gameStopper = new Subject<number>();
  guessEvaluation = new Subject<guessEvaluation>();
  overlaySubject = new Subject<boolean>();
  turnWhenRuleExpires = 0;

  constructor(private timerService: TimerService) {}

  checkUserGuess(staticCard: Card, randomCard: Card, staticCardIndex: number) {
    if (
      this.activeRule === 'color' &&
      staticCard.colorOfForms === randomCard.colorOfForms
    ) {
      this.forwardGuessEvaluation(staticCardIndex, 'CORRECT');
    } else if (
      this.activeRule === 'numberOfShapes' &&
      staticCard.numberOfShapes === randomCard.numberOfShapes
    ) {
      this.forwardGuessEvaluation(staticCardIndex, 'CORRECT');
    } else if (
      this.activeRule === 'shape' &&
      staticCard.shapeOfForms === randomCard.shapeOfForms
    ) {
      this.forwardGuessEvaluation(staticCardIndex, 'CORRECT');
    } else {
      this.forwardGuessEvaluation(staticCardIndex, 'WRONG');
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
      this.activeRule = inactiveRules[this.getRandomNumberForRule()];
    }

    this.turnWhenRuleExpires = this.turns + 7;
  }

  private getRandomNumberForRule(): number {
    return Math.floor(Math.random() * 2);
  }

  private forwardGuessEvaluation(
    staticCardIndex: number,
    evaluationText: 'CORRECT' | 'WRONG'
  ) {
    this.guessEvaluation.next({
      evaluationText: evaluationText,
      staticCardIndex: staticCardIndex,
    });
    if (evaluationText === 'CORRECT') {
      this.timerService.calculateReactionTime();
    }
  }
}
