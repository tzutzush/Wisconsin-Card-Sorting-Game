import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardContainerComponent } from './card-container/card-container.component';
import { CardsContainerComponent } from './main-board/cards-container/cards-container.component';
import { EvaluationScreenComponent } from './main-board/evaluation-screen/evaluation-screen.component';
import { MainBoardComponent } from './main-board/main-board.component';

@NgModule({
  declarations: [
    AppComponent,
    CardContainerComponent,
    CardsContainerComponent,
    EvaluationScreenComponent,
    MainBoardComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
