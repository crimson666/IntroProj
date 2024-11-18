import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../interfaces/post';

@Injectable({
  providedIn: 'root'
})
export class MessegeService {

  constructor(private http: HttpClient) { }

  private url = 'https://jsonplaceholder.typicode.com/posts';
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.url);
  }
}
