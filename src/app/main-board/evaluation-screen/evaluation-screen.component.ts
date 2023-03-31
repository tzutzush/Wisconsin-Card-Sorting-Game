import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/game.service';

@Component({
  selector: 'app-evaluation-screen',
  templateUrl: './evaluation-screen.component.html',
  styleUrls: ['./evaluation-screen.component.css'],
})
export class EvaluationScreenComponent implements OnInit {
  guessOutcome: string = '';
  constructor(private gameService: GameService) {}
  ngOnInit(): void {
    this.gameService.guessEvaluation.subscribe((value) => {
      this.guessOutcome = value;
    });
  }
}
