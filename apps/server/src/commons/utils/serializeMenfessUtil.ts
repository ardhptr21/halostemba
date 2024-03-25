import { Vote } from '@halostemba/db';
import { UserEntity } from '@halostemba/entities';

export default function serializeMenfessUtil(
  data: any | any[],
  user: UserEntity,
) {
  const serializeAuthor = (menfess: any) =>
    menfess.anonymous ? { ...menfess, author: null } : menfess;
  const serializeVotes = (menfess: any) => {
    const vote = menfess.votes?.find((vote: Vote) => vote.userId === user.id);
    delete menfess.votes;
    return { ...menfess, voted: vote ? vote.type : null };
  };

  if (!Array.isArray(data)) {
    let processed = serializeAuthor(data);
    if (user) processed = serializeVotes(data);
    return processed;
  }

  let processed = data.map(serializeAuthor);
  if (user) processed = data.map(serializeVotes);
  return processed;
}
