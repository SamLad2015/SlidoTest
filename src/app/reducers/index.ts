import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import {EventState} from '../states/event-state';
import {EventReducer} from './event.reducer';

export interface State {
  event: EventState;
}

export const reducers: ActionReducerMap<State> = {
  event: EventReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
