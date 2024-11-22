import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { MessegeService } from './messege.service';
import { Post } from '../interfaces/post';
import { languages, latestprices, orderBook, students } from '../interfaces/store';

describe('MessegeService', () => {
  let service: MessegeService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MessegeService]
    });

    service = TestBed.inject(MessegeService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verify there are no outstanding requests after each test
    httpTestingController.verify();
  });

  describe('getPosts', () => {
    it('should return an array of Post objects', () => {
      const mockPosts: Post[] = [
        { userId: 1, id: 1, title: 'title 1', body: 'body 1' },
        { userId: 2, id: 2, title: 'title 2', body: 'body 2' }
      ];

      service.getPosts().subscribe(posts => {
        expect(posts).toEqual(mockPosts);
      });

      const req = httpTestingController.expectOne(service.url);
      expect(req.request.method).toEqual('GET');

      req.flush(mockPosts);
    });
  });

  describe('getLanguagePosts', () => {
    it('should return languages data', () => {
      const mockLanguagesData: languages[] = [{ id: 4, name: 'English', }];

      service.getLanguagePosts().subscribe(data => {
        expect(data).toEqual(mockLanguagesData);
      });

      const req = httpTestingController.expectOne('http://localhost:3000/languages');
      expect(req.request.method).toEqual('GET');

      req.flush(mockLanguagesData);
    });
  });

  // Similar tests for other methods (getStudentsPosts, getoutorderPosts, getlatestpricesPosts)
  // ...
});