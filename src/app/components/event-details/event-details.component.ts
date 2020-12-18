import {Component, Input, OnInit} from '@angular/core';
import {EventData} from '../../models/event-data';
import { FormGroup } from '@angular/forms';
import {EventFormHelper} from '../../helpers/event-form.helper';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {
  @Input()
  modal: any;

  @Input()
  event: EventData;

  @Input()
  eventPeriod: string;

  eventForm: FormGroup;
  constructor(private eventFormHelper: EventFormHelper) { }

  ngOnInit(): void {
    this.eventForm = this.eventFormHelper.getEventForm(this.event);
  }

  saveForm(modal: any): void {
    modal.close(this.eventFormHelper.getEvent(this.eventForm.value, this.event));
  }

  isFormInvalid(): boolean {
    return this.eventFormHelper.isFormInvalid(this.eventForm);
  }

  twoDigitNumber = (fieldName) => {
    this.eventForm.value[fieldName] =
      this.eventFormHelper.twoDigitNumber(this.eventForm.value[fieldName]);
  }
}
