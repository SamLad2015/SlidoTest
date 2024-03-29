import {Component, OnInit, TemplateRef} from '@angular/core';
import * as EventActions from '../../actions/event.actions';
import {Store} from '@ngrx/store';
import {EventData} from '../../models/event-data';
import {Observable} from 'rxjs';
import {State} from '../../reducers';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DateComparerHelper} from '../../helpers/date-comparer.helper';
import {map} from 'rxjs/operators';

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
              private dateComparerHelper: DateComparerHelper) {
  }

  ngOnInit(): void {
    this.events$ = this.store.select(s => s.event.events);
    this.store.dispatch(EventActions.BeginGetEventsAction());
  }

  open = (content: TemplateRef<any>, ev: EventData = undefined) => {
    this.selectedEvent = ev || new EventData();
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      centered: true
    }).result.then((event) => {
      if (event.id < 0) {
        this.store.select(s => s.event.events)
          .subscribe(es => event.id = Math.max.apply(Math, es.map(e => e.id)) + 1);
        this.store.dispatch(EventActions.addEvent(event));
      } else {
        this.store.dispatch(EventActions.updateEvent(event));
      }
    }).catch(() => {
    });
  }

  periodOfEvent = (event) => (this.dateComparerHelper.periodOfEvent(event));

  formatEvents = (eventsStream: Observable<EventData[]>): Observable<EventData[]> => (
    eventsStream.pipe(map((events: EventData[]) =>
      events.map(e => ({...e, period: this.periodOfEvent(e)}))
        .sort((a, b) => this.dateComparerHelper.compareDates(a, b))
    ))
  )
}
