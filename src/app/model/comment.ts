import { Item } from './item';

export class Comment extends Item {
  constructor() {
    super();
  }
  text: string;
  kids: [];
  subComments: Array<Comment>;
  time: number;
}
