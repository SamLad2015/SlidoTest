import {Action, createReducer, on } from '@ngrx/store';
import {EventState, initializeEventState} from '../states/event-state';
import * as EventActions from '../actions/event.actions';
import {EventData} from '../models/event-data';

export const initialState = initializeEventState();

const reducer = createReducer(
  initialState,
  on(EventActions.loadEvents, state => state),
  on(EventActions.addEvent, (state: EventState, event: EventData) => {
    return { ...state, events: [...state.events, event], Error: null };
  }),
  on(EventActions.updateEvent, (state: EventState, event: EventData) => {
    return { ...state, events: [...state.events.filter(e => e.id !== event.id), event], Error: null };
  }),
  on(EventActions.deleteEvent, (state: EventState, event: EventData) => {
    return { ...state, events: state.events.filter(e => e.id !== event.id), Error: null };
  }),
  on(EventActions.loadEventsSuccess, (state: EventState, { events }) => {
    return { ...state, events };
  }),
  on(EventActions.eventFailure, (state: EventState, error) => {
    console.error(error);
    return { ...state, Error: error };
  })
);

export const EventReducer = (state: EventState | undefined, action: Action) => reducer(state, action);
