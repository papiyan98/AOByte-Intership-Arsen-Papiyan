import { calcPostAverageRate } from "./calcPostAverageRate";

export const filterMaxAverageRatedPost = (posts) => {
  let maxAverageRate = -Infinity;
  let maxAverageRatedPost = null;

  posts.forEach(post => {
    const postAverageRate = calcPostAverageRate(post);
    
    if (postAverageRate > maxAverageRate) {
      maxAverageRate = postAverageRate;
      maxAverageRatedPost = post;
    }
  })

  return maxAverageRatedPost;
}