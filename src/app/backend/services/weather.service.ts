import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {mergeMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private locationApi = 'http://open.mapquestapi.com/geocoding/v1/address?key=c5AA0GilMLFDlXrRbtSdv0kuVnjHPTEg&location=';
  private weatherApi = 'https://api.met.no/weatherapi/locationforecast/2.0/complete?';

  constructor(private http: HttpClient) {
  }

  getWeather = (location: string): Observable<any> => {
    return this.http.get(this.locationApi + location).pipe(
      mergeMap((l: any) => this.http
        .get(`${this.weatherApi}lat=${l.results[0].locations[0].latLng.lat}&lon=${l.results[0].locations[0].latLng.lng}`))
    );
  }
}
