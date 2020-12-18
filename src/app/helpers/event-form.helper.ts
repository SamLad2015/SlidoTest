import {FormControl, FormGroup} from '@angular/forms';
import * as moment from 'moment';
import {Injectable} from '@angular/core';
import {EventData} from '../models/event-data';

@Injectable({
  providedIn: 'root'
})
export class EventFormHelper {
  getEventForm = (event: EventData) => {
    return new FormGroup({
      title: new FormControl(event.title),
      eventStartDate: new FormControl({
        day: moment(event.eventStartDate).date(),
        month: moment(event.eventStartDate).month(),
        year: moment(event.eventStartDate).year()
      }),
      eventStartTimeHH: new FormControl(this.twoDigitNumber(moment(event.eventStartDate).hour())),
      eventStartTimeMM: new FormControl(this.twoDigitNumber(moment(event.eventStartDate).minutes())),
      eventEndDate: new FormControl({
        day: moment(event.eventEndDate).date(),
        month: moment(event.eventEndDate).month(),
        year: moment(event.eventEndDate).year()
      }),
      eventEndTimeHH: new FormControl(this.twoDigitNumber(moment(event.eventEndDate).hour())),
      eventEndTimeMM: new FormControl(this.twoDigitNumber(moment(event.eventEndDate).minutes())),
      location: new FormControl(event.location),
    });
  }

  getEvent = (formValue, event) => {
    return {
      id: event.id,
      title: formValue.title,
      location: formValue.location,
      eventStartDate: this.getEventDateTime(formValue.eventStartDate, formValue.eventStartTimeHH, formValue.eventStartTimeMM),
      eventEndDate: this.getEventDateTime(formValue.eventEndDate, formValue.eventEndTimeHH, formValue.eventEndTimeMM)
    };
  }

  isFormInvalid = (eventForm: FormGroup) => {
    return (eventForm.invalid) ||
      !(this.getDateTime(
        eventForm.value.eventEndDate,
        eventForm.value.eventEndTimeHH,
        eventForm.value.eventEndTimeMM).isAfter(
        this.getDateTime(
          eventForm.value.eventStartDate,
          eventForm.value.eventStartTimeHH,
          eventForm.value.eventStartTimeMM)
      )) || (
        eventForm.value.title.trim() === '' ||
        eventForm.value.location.trim() === ''
      );
  }

  twoDigitNumber = (value) => {
    if (parseInt(value, 10) < 10) {
      return '0' + value;
    }
    return value;
  }

  private getDateTime = (eventDate, eventTimeHH, eventTimeMM) => {
    return moment(`${eventDate.year}-${eventDate.month + 1}-${eventDate.day} ${eventTimeHH}:${eventTimeMM}:00`);
  }

  private getEventDateTime = (eventDate: any, eventTimeHH: FormControl, eventTimeMM: FormControl) => {
    return this.getDateTime(eventDate, eventTimeHH, eventTimeMM).toJSON();
  }
}
