import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/card.model';
import { CardService } from 'src/app/card.service';
import { GameService } from 'src/app/game.service';

@Component({
  selector: 'app-evaluation-screen',
  templateUrl: './evaluation-screen.component.html',
  styleUrls: ['./evaluation-screen.component.css'],
})
export class EvaluationScreenComponent implements OnInit {
  guessOutcome: string = '';
  randomCard!: Card;
  constructor(
    private gameService: GameService,
    private cardService: CardService
  ) {}
  ngOnInit(): void {
    this.gameService.guessEvaluation.subscribe((value) => {
      this.guessOutcome = value;
    });
    this.cardService.randomCardSubject.subscribe((randomCard) => {
      this.randomCard = randomCard;
    });
  }
}
