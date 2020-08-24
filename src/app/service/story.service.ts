import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StoryService {
  stories: Array<number>;

  constructor(private httpClient: HttpClient) {}

  public getStories(storyType: string) {
    console.log('calliong service getStories' + storyType);
    let promise = new Promise((resolve, reject) => {
      this.httpClient
        .get(`${environment.apiUrl}/${storyType}stories.json`)
        .subscribe((stories: Array<number>) => {
          this.stories = stories;
          resolve(stories);
        });
    });
    return promise;
  }

  public getStoryById(id: Number) {
    return this.httpClient.get(`${environment.apiUrl}/item/${id}.json`);
  }
}
