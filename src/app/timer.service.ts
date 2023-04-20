import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  timerStarted!: number;
  timerStopped!: number;
  reactionTimeOfClicks: number[] = [];
  reactionTimeAverage = new BehaviorSubject<number>(0);

  constructor() {}

  startTimer() {
    this.timerStarted = Date.now();
  }

  stopTimer() {
    this.timerStopped = Date.now();
  }

  calculateReactionTime() {
    this.reactionTimeOfClicks.push(
      (this.timerStopped - this.timerStarted) / 1000
    );
  }

  calculateReactionTimeAverage(): void {
    const value =
      this.reactionTimeOfClicks.reduce(
        (accumulator, currentValue) => accumulator + currentValue
      ) /
        this.reactionTimeOfClicks.length +
      1;
    this.reactionTimeAverage.next(value);
  }
}
