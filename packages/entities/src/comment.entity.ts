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
