import { Comment } from './comment';
import { Item } from './item';

export class Story extends Item {
  constructor() {
    super();
  }
  title: string;
  url: string;
  score: number;
  comments: Array<Comment>;
}
