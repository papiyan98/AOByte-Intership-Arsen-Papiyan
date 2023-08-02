import { origin } from "../constants";

export const calcPostAverageRate = (post) => {
  const { comments } = post;

  if (comments.length === 0) return 0;

  const totalRate = comments.reduce((acc, comment) => {
    return acc += comment.rate;
  }, 0);

  return totalRate / comments.length;
}

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

export const disableAllButtons = () => { 
  document.querySelectorAll('.rate-btn').forEach(button => {
    Array.from(button.children).forEach(child => {
      switch (child.tagName) {
        case 'IMG':
          child.src = new URL(origin + '/images/rate-icon.png');
          break;
        case 'SPAN':
          child.innerHTML = "Rate"
          break;
        default:
          break;
      }
    });
  });
}

export const finalAverageRateCalculation = (post) => {
  return parseFloat(+(calcPostAverageRate(post)).toPrecision(2));
}

export const validateEmail = (email) => {
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return pattern.test(email);
}

export const getCookies = () => {
  const cookies = document.cookie.split('; ').map(cookie => cookie.split('='));

  const cookiesObj = cookies.map(cookie => {
    const name = cookie[0];
    const value = cookie[1];

    return {
      [name]: value
    }
  });

  return cookiesObj;
}