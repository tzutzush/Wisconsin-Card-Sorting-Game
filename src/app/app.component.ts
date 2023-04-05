import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CardService } from './card.service';
import { GameService } from './game.service';

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
    private cardService: CardService
  ) {}
  onStartGame() {
    this.gameStarted = true;
    this.cardService.createRandomCard();
    this.gameService.checkRuleExpiration();
  }
  ngOnInit(): void {
    this.gameService.gameStopper.subscribe((value) =>
      value === 60 ? (this.gameStarted = false) : (this.gameEnded = true)
    );
    this.gameService.overlaySubject.subscribe((value) => {
      this.overlay = value;
    });
  }
}
