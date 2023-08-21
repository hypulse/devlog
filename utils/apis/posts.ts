const API_BASE = "/api/posts";

async function fetchAPI(path: string, options = {}) {
  const response = await fetch(path, options);

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || "An error occurred");
  }

  return response.json();
}

export const getPosts = async () => {
  return await fetchAPI(API_BASE);
};

export const getPost = async (id: string) => {
  return await fetchAPI(`${API_BASE}/${id}`);
};

export const createPost = async (post: any) => {
  return await fetchAPI(API_BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
};

export const updatePost = async (id: string, updatedPost: any) => {
  return await fetchAPI(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedPost),
  });
};

export const deletePost = async (id: string) => {
  return await fetchAPI(`${API_BASE}/${id}`, {
    method: "DELETE",
  });
};
