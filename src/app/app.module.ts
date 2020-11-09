import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import {EventEffects} from './effects/EventEffects';
import {HttpClientModule} from '@angular/common/http';
import { EventsComponent } from './components/events/events.component';
import { EventComponent } from './components/event/event.component';
import {NgbDateNativeUTCAdapter, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MomentDateFormatter} from './helpers/moment-date-formatter.helper';

@NgModule({
  declarations: [
    AppComponent,
    EventsComponent,
    EventComponent,
    EventDetailsComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    EffectsModule.forRoot([EventEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [{provide: MomentDateFormatter, useClass: NgbDateNativeUTCAdapter}],
  bootstrap: [AppComponent]
})
export class AppModule { }
