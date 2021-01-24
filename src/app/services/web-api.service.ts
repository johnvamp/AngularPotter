import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebApiService {

  api_url = "http://hp-api.herokuapp.com/api/characters"

  constructor(private http: HttpClient) { }

  fetchData(): Observable<JSON> {
    return this.http.get<JSON>(this.api_url);
  }
}
