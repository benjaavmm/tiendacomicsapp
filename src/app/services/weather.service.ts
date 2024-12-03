import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = environment.weatherApiKey;
  private lat = -33.4569; // Latitud de Santiago
  private lon = -70.6483; // Longitud de Santiago

  constructor(private http: HttpClient) {}

  getCurrentWeather(): Observable<any> {
    const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${this.lat}&lon=${this.lon}&exclude=minutely,hourly,daily,alerts&units=metric&lang=es&appid=${this.apiKey}`;
    return this.http.get(url);
  }
}
