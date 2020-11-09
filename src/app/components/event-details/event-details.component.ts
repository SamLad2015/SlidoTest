import {Component, Input, OnInit} from '@angular/core';
import {EventData} from '../../models/event-data';
import { FormGroup, FormControl } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {
  @Input()
  modal: any;

  @Input()
  event: EventData;

  eventForm: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.eventForm = new FormGroup({
      title: new FormControl(this.event.title),
      eventDate: new FormControl({
        day: moment(this.event.eventDate).date(),
        month: moment(this.event.eventDate).month(),
        year: moment(this.event.eventDate).year()
      }),
      eventTimeHH: new FormControl(moment(this.event.eventDate).hour()),
      eventTimeMM: new FormControl(moment(this.event.eventDate).minutes()),
      location: new FormControl(this.event.location),
    });
  }

}
