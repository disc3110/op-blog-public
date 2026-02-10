import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchPublicPostById } from "../services/postService";
import { fetchCommentsForPost } from "../services/commentService";

function formatDateTime(dateStr) {
  try {
    return new Date(dateStr).toLocaleString();
  } catch {
    return "";
  }
}

function PostDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const postId = Number(id);

  const [post, setPost] = useState(null);
  const [postLoading, setPostLoading] = useState(true);
  const [postError, setPostError] = useState("");

  const [comments, setComments] = useState([]);
  const [commentsMeta, setCommentsMeta] = useState({
    page: 1,
    pageSize: 20,
    totalItems: 0,
    totalPages: 1,
  });
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [commentsError, setCommentsError] = useState("");

  useEffect(() => {
    if (Number.isNaN(postId)) {
      navigate("/", { replace: true });
      return;
    }

    async function loadPost() {
      setPostLoading(true);
      setPostError("");
      try {
        const data = await fetchPublicPostById(postId);
        setPost(data.post);
      } catch (err) {
        console.error(err);
        setPostError(err.message || "Failed to load post");
      } finally {
        setPostLoading(false);
      }
    }

    loadPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);

  async function loadComments(options = {}) {
    const page = options.page ?? commentsMeta.page;
    setCommentsLoading(true);
    setCommentsError("");

    try {
      const res = await fetchCommentsForPost(postId, {
        page,
        pageSize: commentsMeta.pageSize,
      });

      setComments(res.comments || []);
      setCommentsMeta(res.meta || commentsMeta);
    } catch (err) {
      console.error(err);
      setCommentsError(err.message || "Failed to load comments");
    } finally {
      setCommentsLoading(false);
    }
  }

  useEffect(() => {
    if (!Number.isNaN(postId)) {
      loadComments({ page: 1 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);

  function handleCommentsPageChange(nextPage) {
    if (
      nextPage < 1 ||
      nextPage > commentsMeta.totalPages ||
      commentsLoading
    ) {
      return;
    }
    loadComments({ page: nextPage });
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <header className="mb-6 flex items-center justify-between gap-4">
          <Link
            to="/"
            className="text-xs text-slate-300 hover:text-slate-100 underline underline-offset-4"
          >
            ← Back to posts
          </Link>
        </header>

        {postLoading ? (
          <p className="text-sm text-slate-400">Loading post…</p>
        ) : postError ? (
          <div className="rounded-md bg-red-500/10 border border-red-500 text-red-200 px-3 py-2 text-sm">
            {postError}
          </div>
        ) : !post ? (
          <p className="text-sm text-slate-400">
            Post not found or no longer available.
          </p>
        ) : (
          <>
            <article className="mb-10">
              <h1 className="text-3xl font-bold mb-3">{post.title}</h1>

              <div className="mb-4 text-xs text-slate-400 flex items-center gap-2 flex-wrap">
                {post.author && (
                  <span>By {post.author.name || post.author.email}</span>
                )}
                <span>·</span>
                <span>{formatDateTime(post.createdAt)}</span>
                <span>·</span>
                <span>
                  {post._count?.comments ?? 0} comments ·{" "}
                  {post._count?.likes ?? 0} likes
                </span>
              </div>

              <div className="prose prose-invert prose-sm max-w-none">
                <p className="whitespace-pre-wrap leading-relaxed text-slate-100">
                  {post.content}
                </p>
              </div>
            </article>

            <section>
              <h2 className="text-lg font-semibold mb-3">Comments</h2>

              {commentsError && (
                <div className="mb-3 rounded-md bg-red-500/10 border border-red-500 text-red-200 px-3 py-2 text-xs">
                  {commentsError}
                </div>
              )}

              <div className="rounded-lg border border-slate-800 bg-slate-900/60">
                {commentsLoading ? (
                  <p className="px-4 py-4 text-xs text-slate-400">
                    Loading comments…
                  </p>
                ) : comments.length === 0 ? (
                  <p className="px-4 py-4 text-xs text-slate-400">
                    No comments yet. Be the first to comment once we add
                    public login!
                  </p>
                ) : (
                  <>
                    <ul className="divide-y divide-slate-800">
                      {comments.map((comment) => (
                        <li
                          key={comment.id}
                          className="px-4 py-3 text-sm text-slate-100"
                        >
                          <p>{comment.content}</p>
                          <div className="mt-1 text-[11px] text-slate-400 flex items-center gap-2 flex-wrap">
                            <span>
                              By {comment.author?.name || "Unknown user"}
                            </span>
                            <span>·</span>
                            <span>{formatDateTime(comment.createdAt)}</span>
                            <span>·</span>
                            <span>{comment._count?.likes ?? 0} likes</span>
                          </div>
                        </li>
                      ))}
                    </ul>

                    <div className="flex items-center justify-between px-4 py-2 border-t border-slate-800 text-[11px] text-slate-400">
                      <div>
                        Page{" "}
                        <span className="font-semibold">
                          {commentsMeta.page}
                        </span>{" "}
                        of{" "}
                        <span className="font-semibold">
                          {commentsMeta.totalPages}
                        </span>{" "}
                        ·{" "}
                        <span className="font-semibold">
                          {commentsMeta.totalItems}
                        </span>{" "}
                        comments
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            handleCommentsPageChange(commentsMeta.page - 1)
                          }
                          disabled={
                            commentsMeta.page <= 1 || commentsLoading
                          }
                          className="px-3 py-1 rounded-md border border-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-900"
                        >
                          Previous
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            handleCommentsPageChange(commentsMeta.page + 1)
                          }
                          disabled={
                            commentsMeta.page >= commentsMeta.totalPages ||
                            commentsLoading
                          }
                          className="px-3 py-1 rounded-md border border-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-900"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}

export default PostDetailPage;