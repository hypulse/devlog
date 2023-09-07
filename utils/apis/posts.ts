import { PostState, PostTypeGet, PostTypePost } from "@/types/post";
import fetchAPI from "../fetchAPI";

const API_BASE = `${process.env.NEXT_PUBLIC_ORIGIN_URL}/api/posts`;

export const getPosts = async (
  state: PostState = "active",
  page: number = 1,
  limit: number = 10
) => {
  const url = `${API_BASE}?state=${state}&page=${page}&limit=${limit}`;
  return await fetchAPI<Array<PostTypeGet>>(url);
};

export const getPost = async (id: string) => {
  return await fetchAPI<PostTypeGet>(`${API_BASE}/${id}`);
};

export const createPost = async (post: PostTypePost) => {
  return await fetchAPI<PostTypeGet>(API_BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
};

export const updatePost = async (id: string, updatedPost: PostTypePost) => {
  return await fetchAPI<PostTypeGet>(`${API_BASE}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedPost),
  });
};

export const updatePostState = async (id: string, newState: PostState) => {
  return await fetchAPI<PostTypeGet>(`${API_BASE}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ state: newState }),
  });
};

export const deletePost = async (id: string) => {
  return await fetchAPI<{}>(`${API_BASE}/${id}`, {
    method: "DELETE",
  });
};

export const searchPosts = async (q: string, page: number = 1) => {
  const url = `${API_BASE}/search?q=${q}&page=${page}`;
  return await fetchAPI<{ posts: Array<PostTypeGet>; lastPage: number }>(url);
};
