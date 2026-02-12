import { apiRequest } from "./apiClient";

// Public posts: GET /api/posts (published only, with pagination + filters)
export async function fetchPublicPosts({
  page = 1,
  pageSize = 10,
  search = "",
  authorId,
} = {}) {
  const params = new URLSearchParams();

  params.set("page", page);
  params.set("pageSize", pageSize);

  if (search) params.set("search", search);
  if (authorId) params.set("authorId", authorId);

  return apiRequest(`/posts?${params.toString()}`);
}

// Public post details: GET /api/posts/:id (only if published)
export async function fetchPublicPostById(postId) {
  return apiRequest(`/posts/${postId}`, {
    method: "GET",
  });
}

export async function likePost(postId) {
  return apiRequest(`/posts/${postId}/like`, {
    method: "POST",
  });
}

export async function unlikePost(postId) {
  return apiRequest(`/posts/${postId}/like`, {
    method: "DELETE",
  });
}