import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CardService } from './card.service';
import { GameService } from './game.service';
import { TimerService } from './timer.service';

const TURNS: number = 60;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  title = 'wcst';
  gameEnded: boolean = false;
  gameStarted: boolean = false;
  overlay: boolean = false;
  constructor(
    private gameService: GameService,
    private cardService: CardService,
    private timerService: TimerService
  ) {}
  onStartGame() {
    this.gameStarted = true;
    this.cardService.createRandomCard();
    this.gameService.checkRuleExpiration();
  }
  ngOnInit(): void {
    this.gameService.gameStopper.subscribe((value) => {
      if (value === TURNS) {
        this.gameEnded = true;
        this.timerService.calculateReactionTimeAverage();
      } else {
        this.gameEnded = false;
      }
    });
    this.gameService.overlaySubject.subscribe((value) => {
      this.overlay = value;
    });
  }
}
