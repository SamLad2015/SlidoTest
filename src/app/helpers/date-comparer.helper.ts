import * as moment from 'moment';
import {EventData} from '../models/event-data';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateComparerHelper {
  periodOfEvent = (event: EventData) => {
    switch (true) {
      case moment(event.eventEndDate).isBefore(moment()):
        return 'past';
      case moment(event.eventStartDate).isSame(moment()):
      case moment(event.eventStartDate).isBefore(moment()) &&
           moment(event.eventEndDate).isAfter(moment()):
        return 'current';
      case moment(event.eventStartDate).isAfter(moment()):
        return 'future';
    }
  }
  compareDates = (event1: EventData, event2: EventData) => {
    return +moment(event1.eventStartDate) - +moment(event2.eventStartDate);
  }
}
