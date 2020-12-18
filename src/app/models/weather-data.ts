export class WeatherData {
  wind: string;
  temperature: string;
  airPressure: string;
  humidity: string;
  windDirection: string;
  updatedAt: string;
  constructor(data: any, time?: string) {
    this.wind = data.wind_speed;
    this.temperature = data.air_temperature;
    this.airPressure = data.air_pressure_at_sea_level;
    this.humidity = data.relative_humidity;
    this.windDirection = data.wind_from_direction;
    this.updatedAt = time;
  }
}
