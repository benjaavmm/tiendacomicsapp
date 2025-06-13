import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private apiUrl = 'https://api.exchangerate.host/convert';

  constructor(private http: HttpClient) {}

  // Método para obtener tasa de cambio CLP a USD
  getCLPtoUSDRate(): Observable<number> {
    return this.http.get<any>(`${this.apiUrl}?from=CLP&to=USD&amount=1`).pipe(
      map(response => response.result || 0.0011),
      catchError(() => of(0.0011)) // Tasa de respaldo si falla
    );
  }

  // Convertir CLP a USD
  convertCLPtoUSD(clpAmount: number): Observable<number> {
    return this.getCLPtoUSDRate().pipe(
      map(rate => parseFloat((clpAmount * rate).toFixed(2)))
    );
  }
}
