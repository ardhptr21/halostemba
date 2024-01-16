export class MenfessEntity {
  id: string;
  content: string;
  score: number;
  anonymous: boolean;
  createdAt: string;
  author?: {
    name: string;
    username: string;
    avatar: string;
  } | null;
  voted: boolean | null;
}
