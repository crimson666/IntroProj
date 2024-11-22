import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../interfaces/post';
import { languages, latestprices, orderBook, students } from '../interfaces/store';

@Injectable({
  providedIn: 'root'
})
export class MessegeService {

  constructor(private http: HttpClient) { }

  url = 'https://jsonplaceholder.typicode.com/posts';
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.url);
  }

  getLanguagePosts(): Observable<languages[]> {
    return this.http.get<languages[]>('http://localhost:3000/languages');
  }

  getStudentsPosts(): Observable<students> {
    return this.http.get<students>('http://localhost:3000/student');
  }

  getoutorderPosts(): Observable<orderBook> {
    return this.http.get<orderBook>('http://localhost:3000/orderbook');
  }

  getlatestpricesPosts(): Observable<latestprices> {
    return this.http.get<latestprices>('http://localhost:3000/latestprices');
  }
}
