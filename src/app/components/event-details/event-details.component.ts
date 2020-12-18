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

  eventForm: FormGroup;
  error: string;
  constructor(private eventFormHelper: EventFormHelper) { }

  ngOnInit(): void {
    this.eventForm = this.eventFormHelper.getEventForm(this.event);
    if (this.event.period === 'past') {
      this.eventForm.disable();
    }
  }

  saveForm(modal: any): void {
    if (!this.isFormInvalid()) {
      modal.close(this.eventFormHelper.getEvent(this.eventForm.value, this.event));
    }
  }

  isFormAltered = (): boolean => {
    return this.eventForm.dirty;
  }

  isFormInvalid = (): any => {
    const formTest = this.eventFormHelper.isFormInvalid(this.eventForm);
    this.error = formTest.error;
    return formTest.status;
  }

  twoDigitNumber = (fieldName) => {
    this.eventForm.value[fieldName] =
      this.eventFormHelper.twoDigitNumber(this.eventForm.value[fieldName]);
  }
}
