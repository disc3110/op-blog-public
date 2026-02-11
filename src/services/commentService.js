import { apiRequest } from "./apiClient";

// Public comments for a post (GET /api/posts/:postId/comments)
export async function fetchCommentsForPost(postId, { page = 1, pageSize = 20 } = {}) {
  const params = new URLSearchParams();
  params.set("page", page);
  params.set("pageSize", pageSize);

  return apiRequest(`/posts/${postId}/comments?${params.toString()}`);
}

export async function createComment(postId, content) {
  return apiRequest(`/posts/${postId}/comments`, {
    method: "POST",
    body: JSON.stringify({ content }),
  });
}