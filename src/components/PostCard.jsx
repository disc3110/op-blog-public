function formatDate(dateStr) {
  try {
    return new Date(dateStr).toLocaleDateString();
  } catch {
    return "";
  }
}

function PostCard({ post }) {
  const excerpt =
    post.content && post.content.length > 180
      ? `${post.content.slice(0, 180)}…`
      : post.content;

  return (
    <article className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 hover:bg-slate-900 transition">
      <header className="mb-2">
        <h2 className="text-lg font-semibold text-slate-50 line-clamp-2">
          {post.title}
        </h2>
        <div className="mt-1 text-xs text-slate-400 flex items-center gap-2 flex-wrap">
          {post.author && (
            <span>By {post.author.name || post.author.email}</span>
          )}
          <span>·</span>
          <span>{formatDate(post.createdAt)}</span>
          <span>·</span>
          <span>
            {post._count?.comments ?? 0} comments ·{" "}
            {post._count?.likes ?? 0} likes
          </span>
        </div>
      </header>

      {excerpt && (
        <p className="text-sm text-slate-200 line-clamp-3">{excerpt}</p>
      )}
    </article>
  );
}

export default PostCard;