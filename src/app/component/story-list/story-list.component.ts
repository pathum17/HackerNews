import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoryService } from '../../service/story.service';
import { Story } from '../../model/story';
import { forkJoin } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-story-list',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.css'],
})
export class StoryListComponent implements OnInit {
  storyType: string;
  previousSearchedType: number;
  searchedTypeChange: boolean;
  loading: boolean;
  stories: Array<Story> = [];
  currentIndex = 0;
  startingIndex = 0;
  maxTotalRecords = 0;
  constructor(
    private route: ActivatedRoute,
    private storyService: StoryService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.stories = [];
    this.initialDataLoad();
  }

  initialDataLoad() {
    this.route.paramMap.subscribe(
      (params) => {
        this.loading = true;
        this.spinner.show();
        this.maxTotalRecords = environment.maxTotalRecords;
        this.storyType = params.get('type');

        // If the search type changed compared to previous search, this will flag it.
        if (
          this.previousSearchedType !== this.getSearchedType(this.storyType)
        ) {
          this.searchedTypeChange = true;
        }

        // set the current search type.
        this.setSearchedType();

        this.storyService.getStories(this.storyType).then(() => {
          this.loadStories();
        });
      },
      (err) => {
        console.log(err);
      },
      () => {
        this.loading = false;
        this.spinner.hide();
      }
    );
  }

  loadStories() {
    this.stories = [];
    const storyList = [];

    if (this.searchedTypeChange) {
      this.startingIndex = 0;
      this.currentIndex = 0;
      this.searchedTypeChange = false;
    }
    if (this.startingIndex < this.maxTotalRecords || this.storyType === 'new') {
      this.loading = true;
      this.spinner.show();
      for (let i = 0; i < environment.noOfRecordsPerPage; i++) {
        if (this.storyType == 'top' || this.storyType === 'best') {
          if (this.currentIndex < this.maxTotalRecords) {
            storyList.push(
              this.storyService.getStoryById(
                this.storyService.stories[this.startingIndex + i]
              )
            );
          }
        } else {
          storyList.push(
            this.storyService.getStoryById(
              this.storyService.stories[this.startingIndex + i]
            )
          );
        }
        this.currentIndex++;
      }
      if (this.startingIndex == 0) {
        this.startingIndex = 1;
      } else {
        this.startingIndex =
          this.startingIndex + environment.noOfRecordsPerPage;
      }

      forkJoin(storyList).subscribe(
        (moreS: Array<Story>) => {
          this.stories = [...moreS];
        },
        (err) => {
          console.log(err);
        },
        () => {
          this.loading = false;
          this.spinner.hide();
        }
      );
    }
  }

  private setSearchedType() {
    if (this.storyType == 'new') {
      this.previousSearchedType = StoryType.NEW;
    } else if (this.storyType == 'top') {
      this.previousSearchedType = StoryType.TOP;
    } else if (this.storyType == 'best') {
      this.previousSearchedType = StoryType.BEST;
    } else {
      this.previousSearchedType = StoryType.NEW;
    }
  }

  private getSearchedType(type: string) {
    switch (type) {
      case 'new':
        return StoryType.NEW;
      case 'top':
        return StoryType.TOP;
      case 'best':
        return StoryType.BEST;
      default:
        return StoryType.NEW;
    }
  }
}

enum StoryType {
  NEW,
  TOP,
  BEST,
}
