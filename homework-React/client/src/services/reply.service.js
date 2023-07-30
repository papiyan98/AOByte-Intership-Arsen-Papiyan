export const addReplyService = async (reply, comment, postId) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}data/replies/add-reply/${postId}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ reply, repliedComment: comment })
  });
  
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error("Failed to add comment");
  }
};

export const deleteReplyService = async (reply, comment, postId) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}data/replies/delete-reply/${postId}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ replyToDelete: reply, repliedComment: comment })
  });

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error("Failed to delete reply");
  }
};

export const updateReplyRateService = async (ratedReply, comment, postId, newRate) => {
  
  const response = await fetch(`${process.env.REACT_APP_API_URL}data/replies/update-reply-rate/${postId}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ ratedReply, repliedComment: comment, newRate })
  });

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error("Failed to update reply rate");
  }
};