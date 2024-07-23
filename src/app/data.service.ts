import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private url = 'https://analy9csservice-dev-rqivqt7gaq-ew.a.run.app/assets/dev';
  private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0IiwicGVybWlzc2lvbnMiOlsiZ2V0OmFzc2V0cy9kZXYiLCJnZXQ6ZXNnLWRhdGEvZGV0YWlscyJdLCJleHAiOjE3MjM5NzE1NTh9.MQjfAk-nc4p3tqNOeb9bscCadR1CLJO2Df1nriIFw7g';

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get(this.url, { headers });
  }
}
