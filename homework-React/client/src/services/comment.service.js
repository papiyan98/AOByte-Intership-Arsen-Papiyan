export const addCommentService = async (comment, postId) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}data/comments/add-comment/${postId}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ comment })
  });
  
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error("Failed to add comment");
  }
};

export const deleteCommentService = async (comment, postId) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}data/comments/delete-comment/${postId}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ commentToDelete: comment })
  });

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error("Failed to delete comment");
  }
};

export const updateCommentRateService = async (postId, ratedComment, newRate) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}data/comments/update-comment-rate/${postId}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ ratedComment, newRate })
  });
  
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error("Failed to update comment rate");
  }
};

export const getAllCommentsService = async (postId) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}data/comments/${postId}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (response.ok) {
    return await response.json()
  } else {
    throw new Error("Failed to fetch comments");
  }
};