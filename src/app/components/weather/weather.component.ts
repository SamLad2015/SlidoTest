import {Component, Input, OnInit} from '@angular/core';
import {WeatherService} from '../../backend/services/weather.service';
import {WeatherData} from '../../models/weather-data';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  @Input()
  location: string;
  weatherData: WeatherData;
  weatherUnits: WeatherData;
  isLoading: boolean;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.weatherService.getWeather(this.location).subscribe((data: any) => {
      if (data.properties) {
        this.weatherData = new WeatherData(data.properties.timeseries[0].data.instant.details, data.properties.timeseries[0].time);
        this.weatherUnits = new WeatherData(data.properties.meta.units);
        this.isLoading = false;
      }
    });
  }
}
