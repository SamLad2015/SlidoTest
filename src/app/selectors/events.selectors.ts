import { createFeatureSelector, createSelector } from '@ngrx/store';

import {EventState} from '../states/event-state';

export const allEvents = createFeatureSelector<EventState>('events');

export const getEvents = createSelector(
  allEvents,
  e => e.events
);
