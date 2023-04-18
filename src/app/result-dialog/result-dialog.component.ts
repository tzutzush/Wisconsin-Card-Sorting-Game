import { Component, OnInit } from '@angular/core';
import { TimerService } from '../timer.service';

@Component({
  selector: 'app-result-dialog',
  templateUrl: './result-dialog.component.html',
  styleUrls: ['./result-dialog.component.css'],
})
export class ResultDialogComponent implements OnInit {
  averageReactionTimeOfSuccessfulCLicks: any;
  constructor(private timerService: TimerService) {}
  ngOnInit(): void {
    this.timerService.reactionTimeAverage.subscribe((value) => {
      this.averageReactionTimeOfSuccessfulCLicks = value;
    });
  }
}
