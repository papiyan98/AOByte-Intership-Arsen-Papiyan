export const getAllCommentsService = async () => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}data/comments`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (response.ok) {
    return await response.json()
  } else {
    throw new Error("Error fetching comments:");
  }
};

export const addCommentService = async (comment, postId) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}data/comments/add-comment/${postId}`, {
    method: "POST",
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

export const deleteCommentService = async (comment) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}data/comments/delete-comment`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ comment })
  });

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error("Failed to delete comment");
  }
};

export const updateCommentRateService = async (commentId, newRate) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}data/comments/update-comment-rate/${commentId}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ newRate })
  });
  
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error("Failed to update comment rate");
  }
};