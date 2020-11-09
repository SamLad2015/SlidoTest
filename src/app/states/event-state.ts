import {EventData} from '../models/event-data';

export interface EventState {
  events: EventData[];
  error: null;
}

export const initializeEventState = (): EventState => {
  return {events: [], error: null};
};
