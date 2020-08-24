import { Component, OnInit, Input } from '@angular/core';

import { Comment } from '../../model/comment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent implements OnInit {
  @Input() comment: Comment;

  constructor() {}

  ngOnInit(): void {
    // console.log('Comment : ' + this.comment.by);
  }
}
