import {Injectable} from '@angular/core';
import * as moment from 'moment';
import {EventData} from '../models/event-data';

@Injectable({
  providedIn: 'root'
})
export class EventsHelper {
  dummyCurrentEvent = (): EventData => {
    return {
      id: -1,
      title: 'test current event',
      eventStartDate: moment().toDate(),
      eventEndDate: moment().add(moment.duration(2, 'hours')).toDate(),
      location: 'Bratislava',
      period: ''
    };
  }
}
