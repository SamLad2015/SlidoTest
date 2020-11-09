import {Component, Input, OnInit} from '@angular/core';
import {EventData} from '../../models/event-data';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  @Input()
  event: EventData;
  @Input()
  eventPeriod: string;
  constructor() { }

  ngOnInit(): void {
  }

}
