import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Story } from '../../model/story';
import { Comment } from '../../model/comment';
import { StoryService } from '../../service/story.service';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css'],
})
export class StoryComponent implements OnInit {
  story: Story;
  storyId: number;
  storyBy: string;
  constructor(
    private route: ActivatedRoute,
    private storyService: StoryService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.storyId = +params.get('storyId');
      this.storyBy = 'pathum';
      this.loadStories();
    });
  }

  loadStories() {
    let commentList = [];

    this.storyService.getStoryById(this.storyId).subscribe(
      (story: Story) => {
        this.story = story;
        this.storyBy = story.by;

        if (this.story.kids !== undefined) {
          this.story.kids.forEach((element) => {
            this.storyService.getStoryById(element).subscribe(
              (comment: Comment) => {
                if (this.story.comments !== undefined) {
                  this.story.comments.push(comment);
                } else {
                  this.story.comments = [];
                  this.story.comments.push(comment);
                }
                this.loadChildComments(comment);
              },
              (err) => console.error(err)
            );
          });
        }
      },
      (err) => {}
    );
  }

  loadChildComments(comment: Comment) {
    let childComments: Array<Comment> = [];

    if (comment.kids !== undefined) {
      comment.kids.forEach((kid) => {
        this.storyService.getStoryById(kid).subscribe(
          (childComment: Comment) => {
            childComments.push(childComment);
            if (comment.subComments != undefined) {
              comment.subComments.push(childComment);
            } else {
              comment.subComments = [];
              comment.subComments.push(childComment);
            }
          },
          (err) => console.log(err)
        );
      });
    }
  }
}
