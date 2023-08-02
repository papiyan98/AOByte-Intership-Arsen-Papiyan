export const getAllRepliesService = async () => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}data/replies`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (response.ok) {
    return await response.json()
  } else {
    throw new Error("Error fetching replies:");
  }
};

export const addReplyService = async (reply, commentId) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}data/replies/add-reply/${commentId}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ reply })
  });
  
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error("Failed to add reply");
  }
};

export const deleteReplyService = async (reply) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}data/replies/delete-reply`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ reply })
  });

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error("Failed to delete reply");
  }
};

export const updateReplyRateService = async (replyId, newRate) => {
  
  const response = await fetch(`${process.env.REACT_APP_API_URL}data/replies/update-reply-rate/${replyId}`, {
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
    throw new Error("Failed to update reply rate");
  }
};