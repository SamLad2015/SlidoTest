import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Observable, of} from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import * as EventActions from '../actions/event.actions';
import { EventData } from '../models/event-data';
import { EventsService } from '../backend/services/events.service';
import {EventsHelper} from '../helpers/events.helper';


@Injectable()
export class EventEffects {
  constructor(private eventsService: EventsService, private action$: Actions, private eventsHelper: EventsHelper) {}

  GetEvents$: Observable<Action> = createEffect(() => {
    return this.action$.pipe(
      ofType(EventActions.BeginGetEventsAction),
      mergeMap(() => this.eventsService.getAll().pipe(
        map((events: EventData[]) => {
          return EventActions.loadEventsSuccess({events: this.addCurrentDummyEvent(events)});
        }),
        catchError((error: Error) => {
          return of(EventActions.eventFailure(error));
        })
        )
      )
    );
  });

  private addCurrentDummyEvent = (events) => {
    const dummyEvent = this.eventsHelper.dummyCurrentEvent();
    dummyEvent.id = Math.max.apply(Math, events.map(e => e.id)) + 1;
    events.push(dummyEvent);
    return events;
  }
}
