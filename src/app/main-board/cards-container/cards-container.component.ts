import { Component, OnInit } from '@angular/core';
import { Card } from '../../card.model';
import { CardService } from '../../card.service';
import { GameService } from '../../game.service';
import { TimerService } from 'src/app/timer.service';

@Component({
  selector: 'app-cards-container',
  templateUrl: './cards-container.component.html',
  styleUrls: ['./cards-container.component.css'],
})
export class CardsContainerComponent implements OnInit {
  overlay: boolean = false;
  staticCards: Card[] = [];
  randomCard!: Card;
  constructor(
    private cardService: CardService,
    private gameService: GameService,
    private timerService: TimerService
  ) {}

  ngOnInit(): void {
    this.staticCards = this.cardService.createStaticCards();
    this.cardService.randomCardSubject.subscribe((card) => {
      this.randomCard = card;
    });
    this.timerService.startTimer();
  }

  onGuess(staticCard: Card, staticCardIndex: number) {
    this.timerService.stopTimer();
    this.timerService.calculateReactionTime();
    this.handleOverlay();
    this.gameService.checkUserGuess(
      staticCard,
      this.randomCard,
      staticCardIndex
    );
    this.gameService.checkRuleExpiration();
    setTimeout(() => {
      this.cardService.createRandomCard();
      this.timerService.startTimer();
    }, 2000);
  }

  private handleOverlay() {
    this.gameService.overlaySubject.next(true);
    setTimeout(() => {
      this.gameService.overlaySubject.next(false);
    }, 2000);
  }
}
