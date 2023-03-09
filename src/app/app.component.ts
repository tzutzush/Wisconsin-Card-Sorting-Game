import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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
  constructor(private gameService: GameService) {}
  onStartGame() {
    this.gameStarted = true;
    this.gameService.checkRuleExpiration();
  }
  ngOnInit(): void {
    this.gameService.gameStopper.subscribe((value) =>
      value === 60 ? (this.gameStarted = false) : (this.gameEnded = true)
    );
  }
}
