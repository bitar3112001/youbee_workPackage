import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { AssetData } from './model/dataModel';
@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  private apiUrl = '/api/assets/dev';

  constructor(private http: HttpClient) { }

  private getToken(): string {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0IiwicGVybWlzc2lvbnMiOlsiZ2V0OmFzc2V0cy9kZXYiLCJnZXQ6ZXNnLWRhdGEvZGV0YWlscyJdLCJleHAiOjE3MjM5NzE1NTh9.MQjfAk-nc4p3tqNOeb9bscCadR1CLJO2Df1nriIFw7g";
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
