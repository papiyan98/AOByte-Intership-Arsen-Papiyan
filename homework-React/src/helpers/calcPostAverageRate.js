export const calcPostAverageRate = (post) => {
  const { comments } = post;

  if (comments.length === 0) return 0;

  const totalRate = comments.reduce((acc, comment) => {
    return acc += comment.rate;
  }, 0);

  return totalRate / comments.length;
}