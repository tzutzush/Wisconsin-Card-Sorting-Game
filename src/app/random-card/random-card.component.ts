import { Component, OnInit } from '@angular/core';
import { Card } from '../card.model';
import { CardService } from '../card.service';

@Component({
  selector: 'app-random-card',
  templateUrl: './random-card.component.html',
  styleUrls: ['./random-card.component.css'],
})
export class RandomCardComponent implements OnInit {
  randomCard!: Card;
  constructor(private cardService: CardService) {}

  ngOnInit(): void {
    this.cardService.randomCardSubject.subscribe((card: Card) => {
      this.randomCard = card;
    });
  }
}
