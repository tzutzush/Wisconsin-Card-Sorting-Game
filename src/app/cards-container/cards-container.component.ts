import { Component, OnInit } from '@angular/core';
import { Card } from '../card.model';
import { CardService } from '../card.service';

@Component({
  selector: 'app-cards-container',
  templateUrl: './cards-container.component.html',
  styleUrls: ['./cards-container.component.css'],
})
export class CardsContainerComponent implements OnInit {
  staticCards: Card[] = [];
  constructor(private cardService: CardService) {}

  ngOnInit(): void {
    this.staticCards = this.cardService.createStaticCards();
  }

  onGuess() {}
}
