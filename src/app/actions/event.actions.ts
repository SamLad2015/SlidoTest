import { createAction, props } from '@ngrx/store';
import {EventData} from '../models/event-data';

export const BeginGetEventsAction = createAction('[ToDo] - Begin Get Events');

export const loadEvents = createAction(
  '[Event] Load Events'
);

export const loadEventsSuccess = createAction(
  '[Event] Load Events Success',
  props<{ events: EventData[] }>()
);

export const eventFailure = createAction(
  '[Event] Events Failure',
  props<Error>()
);

export const addEvent = createAction(
  '[Event] Add Event',
  props<EventData>()
);


