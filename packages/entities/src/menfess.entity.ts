import { CommentEntity } from "comment.entity";
import { MediaEntity } from "media.entity";

export class MenfessEntity {
  id: string;
  content: string;
  score: number;
  anonymous: boolean;
  createdAt: string;
  authorId: string;
  medias: MediaEntity[];
  author?: {
    name: string;
    username: string;
    avatar: string;
  } | null;
  _count: {
    comments: number;
  };
  voted: "UP" | "DOWN" | null;
}

export class MenfessWithCommentEntity extends MenfessEntity {
  comments: CommentEntity[];
}
