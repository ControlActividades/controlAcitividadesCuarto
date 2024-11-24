import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TwilioService {
  private BASE_URL = 'https://backend-production-5386.up.railway.app/twilio';

  constructor(private http: HttpClient) {}

  startVerification(phoneNumber: string): Observable<any> {
    return this.http.post(`${this.BASE_URL}/start-verification`, { phoneNumber });
  }

  checkVerification(phoneNumber: string, code: string): Observable<any> {
    return this.http.post(`${this.BASE_URL}/check-verification`, { phoneNumber, code });
  }
}
