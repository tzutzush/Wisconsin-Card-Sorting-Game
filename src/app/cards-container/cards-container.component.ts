import { Component, OnInit } from '@angular/core';
import { Card } from '../card.model';
import { CardService } from '../card.service';
import { GameService } from '../game.service';

@Component({
  selector: 'app-cards-container',
  templateUrl: './cards-container.component.html',
  styleUrls: ['./cards-container.component.css'],
})
export class CardsContainerComponent implements OnInit {
  staticCards: Card[] = [];
  randomCard!: Card;
  constructor(
    private cardService: CardService,
    private gameService: GameService
  ) {}

  ngOnInit(): void {
    this.staticCards = this.cardService.createStaticCards();
    this.cardService.randomCardSubject.subscribe((card) => {
      console.log(card);

      this.randomCard = card;
    });
  }

  onGuess(staticCard: Card) {
    this.gameService.checkUserGuess(staticCard, this.randomCard);
    this.gameService.checkRuleExpiration();
    this.cardService.createRandomCard();
  }
}
