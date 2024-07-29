import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { AssetData } from './model/AssetData';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  private apiUrl = '/api/assets/dev';

  constructor(private http: HttpClient) { }

  private getToken(): string {
    const token = environment.apiToken
    return token;
  }

getData(): Observable<{ response: AssetData[] }> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`);
    return this.http.get<{ response: AssetData[] }>(this.apiUrl, { headers }).pipe(
      catchError(this.handleError)
    );
  }


  private handleError(error: any) {
    console.error('An error occurred', error);
    return throwError(error);
  }
}
