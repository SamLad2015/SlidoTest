import {Component, OnInit, TemplateRef} from '@angular/core';
import * as EventActions from '../../actions/event.actions';
import { Store } from '@ngrx/store';
import {EventData} from '../../models/event-data';
import {Observable} from 'rxjs';
import {State} from '../../reducers';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DateComparerHelper} from '../../helpers/date-comparer.helper';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  events$: Observable<EventData[]>;
  selectedEvent: EventData;
  constructor(private store: Store<State>,
              private modalService: NgbModal,
              private dateComparerHelper: DateComparerHelper) { }

  ngOnInit(): void {
    this.events$ = this.store.select(s => s.event.events);
    this.store.dispatch(EventActions.BeginGetEventsAction());
  }

  open = (content: TemplateRef<any>, ev: EventData = undefined) => {
    this.selectedEvent = ev || new EventData();
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      centered: true
    }).result.then((result) => {
      console.log(result);
    }).catch(() => {});
  }

  periodOfEvent = (event) => {
    return this.dateComparerHelper.periodOfEvent(event);
  }
}
