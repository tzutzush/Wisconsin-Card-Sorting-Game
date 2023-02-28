import { Component, OnInit } from '@angular/core';
import { Card } from '../card.model';
import { CardService } from '../card.service';

@Component({
  selector: 'app-card-container',
  templateUrl: './card-container.component.html',
  styleUrls: ['./card-container.component.css'],
})
export class CardContainerComponent implements OnInit {
  randomCard!: Card;
  constructor(private cardService: CardService) {}

  ngOnInit(): void {
    this.randomCard = this.cardService.createRandomCard();
  }
}
