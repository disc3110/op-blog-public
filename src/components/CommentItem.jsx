function CommentItem({
  comment,
  user,
  onToggleLike,
  formatDateTime,
}) {
  return (
    <li className="px-4 py-3 text-sm text-slate-100">
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

      {user && (
        <div className="mt-2">
          <button
            type="button"
            onClick={() =>
              onToggleLike(
                comment.id,
                comment.likedByCurrentUser
              )
            }
            className={[
              "text-xs px-3 py-1 rounded-md border transition",
              comment.likedByCurrentUser
                ? "bg-blue-600 border-blue-500 text-white"
                : "bg-slate-900 border-slate-700 text-slate-100 hover:bg-slate-800",
            ].join(" ")}
          >
            {comment.likedByCurrentUser ? "Unlike" : "Like"}
          </button>
        </div>
      )}
    </li>
  );
}

export default CommentItem;