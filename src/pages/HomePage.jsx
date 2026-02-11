import { useEffect, useState } from "react";
import { fetchPublicPosts } from "../services/postService";
import PostCard from "../components/PostCard";
import PublicNavbar from "../components/PublicNavbar";

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [meta, setMeta] = useState({
    page: 1,
    pageSize: 10,
    totalItems: 0,
    totalPages: 1,
  });
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function loadPosts(options = {}) {
    const page = options.page ?? meta.page;
    setLoading(true);
    setError("");

    try {
      const res = await fetchPublicPosts({
        page,
        pageSize: meta.pageSize,
        search,
      });

      setPosts(res.posts);
      setMeta(res.meta);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to load posts");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPosts({ page: 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  function handlePageChange(nextPage) {
    if (nextPage < 1 || nextPage > meta.totalPages || loading) return;
    loadPosts({ page: nextPage });
  }

  function handleSearchSubmit(e) {
    e.preventDefault();
    setSearch(searchInput.trim());
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <PublicNavbar />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Public Blog 🌍
            </h1>
            <p className="mt-2 text-sm text-slate-300 max-w-md">
              Read published posts from the blog, like them, and join the
              discussion in the public app.
            </p>
          </div>

          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center gap-2 w-full sm:w-auto"
          >
            <input
              type="text"
              placeholder="Search posts…"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="flex-1 sm:w-64 rounded-md bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="submit"
              className="rounded-md bg-blue-600 hover:bg-blue-500 px-3 py-2 text-sm font-medium text-white"
            >
              Search
            </button>
          </form>
        </header>

        {error && (
          <div className="mb-4 rounded-md bg-red-500/10 border border-red-500 text-red-200 px-3 py-2 text-sm">
            {error}
          </div>
        )}

        <main>
          {loading ? (
            <p className="text-sm text-slate-400">Loading posts…</p>
          ) : posts.length === 0 ? (
            <p className="text-sm text-slate-400">
              No posts found. Try another search.
            </p>
          ) : (
            <>
              <section className="grid gap-4 md:grid-cols-2">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </section>

              <div className="mt-6 flex items-center justify-between text-xs text-slate-400">
                <div>
                  Page{" "}
                  <span className="font-semibold">{meta.page}</span> of{" "}
                  <span className="font-semibold">{meta.totalPages}</span>{" "}
                  · Total{" "}
                  <span className="font-semibold">{meta.totalItems}</span> posts
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handlePageChange(meta.page - 1)}
                    disabled={meta.page <= 1 || loading}
                    className="px-3 py-1 rounded-md border border-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-900"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePageChange(meta.page + 1)}
                    disabled={meta.page >= meta.totalPages || loading}
                    className="px-3 py-1 rounded-md border border-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-900"
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default HomePage;