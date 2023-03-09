import { Injectable, OnChanges, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameService implements OnChanges {
  rules: string[] = ['color', 'numberOfShapes', 'shape'];
  activeRule: string = '';
  turns: number = 0;
  gameStopper = new Subject<number>();
  turnWhenRuleExpires = 0;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {}

  checkUserGuess() {}

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
