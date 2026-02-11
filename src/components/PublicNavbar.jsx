import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function PublicNavbar() {
  const { user, logout, initializing } = useAuth();
  const location = useLocation();

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <nav className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link to="/" className="text-sm font-semibold text-slate-50">
          Public Blog
        </Link>

        {!initializing && (
          <div className="flex items-center gap-3 text-xs">
            {user ? (
              <>
                <span className="text-slate-300">
                  {user.name || user.email}
                </span>
                <button
                  type="button"
                  onClick={logout}
                  className="rounded-md border border-slate-700 px-3 py-1 text-slate-100 hover:bg-slate-900"
                >
                  Logout
                </button>
              </>
            ) : isAuthPage ? (
              <Link
                to="/"
                className="rounded-md border border-slate-700 px-3 py-1 text-slate-100 hover:bg-slate-900"
              >
                Back to posts
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="rounded-md border border-slate-700 px-3 py-1 text-slate-100 hover:bg-slate-900"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="rounded-md bg-blue-600 hover:bg-blue-500 px-3 py-1 text-white"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default PublicNavbar;