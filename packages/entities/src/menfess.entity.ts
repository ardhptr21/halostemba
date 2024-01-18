import { CommentEntity } from 'comment.entity';

export class MenfessEntity {
  id: string;
  content: string;
  score: number;
  anonymous: boolean;
  createdAt: string;
  authorId: string;
  author?: {
    name: string;
    username: string;
    avatar: string;
  } | null;
  _count: {
    comments: number;
  };
  voted: 'UP' | 'DOWN' | null;
}

export class MenfessWithCommentEntity extends MenfessEntity {
  comments: CommentEntity[];
}
