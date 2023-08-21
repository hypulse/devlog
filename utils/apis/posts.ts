import { PostState } from "@/types";

const API_BASE = "/api/posts";

async function fetchAPI(path: string, options = {}) {
  const response = await fetch(path, options);

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || "An error occurred");
  }

  return response.json();
}

export const getPosts = async (
  state: PostState = "active",
  page: number = 1,
  limit: number = 10
) => {
  const url = `${API_BASE}?state=${state}&page=${page}&limit=${limit}`;
  return await fetchAPI(url);
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
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedPost),
  });
};

export const updatePostState = async (id: string, newState: PostState) => {
  return await fetchAPI(`${API_BASE}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ state: newState }),
  });
};

export const deletePost = async (id: string) => {
  return await fetchAPI(`${API_BASE}/${id}`, {
    method: "DELETE",
  });
};
