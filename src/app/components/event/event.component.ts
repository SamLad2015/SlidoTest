import {Component, Input} from '@angular/core';
import {EventData} from '../../models/event-data';
import * as EventActions from '../../actions/event.actions';
import {Store} from '@ngrx/store';
import {State} from '../../reducers';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent {
  @Input()
  event: EventData;
  @Input()
  eventPeriod: string;
  constructor(private store: Store<State>) { }

  deleteEvent = (ev) => {
    this.store.dispatch(EventActions.deleteEvent(ev));
  }

}
