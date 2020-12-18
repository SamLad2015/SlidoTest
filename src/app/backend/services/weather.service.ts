import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {mergeMap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private locationApi = environment.locationApi;
  private weatherApi = environment.weatherApi;

  constructor(private http: HttpClient) {
  }

  getWeather = (location: string): Observable<any> => {
    return this.http.get(this.locationApi + location).pipe(
      mergeMap((l: any) => this.http
        .get(`${this.weatherApi}lat=${l.results[0].locations[0].latLng.lat}&lon=${l.results[0].locations[0].latLng.lng}`))
    );
  }
}
