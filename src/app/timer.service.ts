import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  timerStarted!: number;
  timerStopped!: number;
  reactionTimeOfClicks: number[] = [];

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
}
