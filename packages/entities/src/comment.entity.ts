import { MenfessEntity } from "menfess.entity";

export class CommentEntity {
  id: string;
  content: string;
  createdAt: string;
  author: {
    name: string;
    username: string;
    avatar: string;
  };
}

export class CommentWithMenfessEntity {
  comment: CommentEntity;
  menfess: MenfessEntity;
}
