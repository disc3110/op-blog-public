function HomePage() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-50">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Public Blog 🌍</h1>
          <p className="mt-2 text-sm text-slate-300">
            Read posts, like them, and join the discussion.
          </p>
        </header>

        <p className="text-slate-400 text-sm">
          Posts list 
        </p>
      </div>
    </div>
  );
}

export default HomePage;