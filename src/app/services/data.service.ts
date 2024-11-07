import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Data } from '../interfaces/data';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public apiURL = 'https://jsonplaceholder.typicode.com/posts';
  constructor(private http: HttpClient) { }
  getData() {
    return ['data 1', 'data 2', 'data 3', 'data 4'];
  }
  getPosts(): Observable<Data[]> {
    return this.http.get<Data[]>(this.apiURL);
  }

}
