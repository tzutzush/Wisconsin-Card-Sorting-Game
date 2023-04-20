import { Component, OnInit } from '@angular/core';
import { TimerService } from '../timer.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-result-dialog',
  templateUrl: './result-dialog.component.html',
  styleUrls: ['./result-dialog.component.css'],
})
export class ResultDialogComponent implements OnInit {
  value$!: Observable<number>;
  constructor(private timerService: TimerService) {}
  ngOnInit(): void {
    this.value$ = this.timerService.reactionTimeAverage.asObservable();
  }
}
