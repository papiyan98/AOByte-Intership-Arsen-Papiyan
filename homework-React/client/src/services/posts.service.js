export const getAllPostsService = async () => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}data/posts`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    }
  });

  return await response.json();
};