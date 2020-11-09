import { Component, OnInit} from '@angular/core';
import * as EventActions from '../../actions/event.actions';
import { Store } from '@ngrx/store';
import {EventData} from '../../models/event-data';
import {Observable} from 'rxjs';
import {State} from '../../reducers';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  events$: Observable<EventData[]>;

  constructor(private store: Store<State>) { }

  ngOnInit(): void {
    this.events$ = this.store.select(s => s.event.events);
    this.store.dispatch(EventActions.BeginGetEventsAction());
  }
}
