import React, { useEffect, useState, useCallback } from "react";
import PostCard from "../components/PostCard.jsx";
import { getAdvisories, getCategories } from "../api/api.js";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [search, setSearch] = useState("");

  const loadPosts = useCallback(async (opts = {}) => {
    try {
      setLoading(true);
      const data = await getAdvisories(opts);
      setPosts(data);
    } catch (err) {
      console.error("Error fetching posts:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  useEffect(() => {
    const loadCats = async () => {
      try {
        const data = await getCategories();
        setCategories(data.categories || []);
      } catch {}
    };
    loadCats();
  }, [loadPosts]);

  return (
    <div>
      {/* Hero */}
      <div className="p-4 p-md-5 mb-4 rounded-3" style={{ background: "linear-gradient(135deg,#e8f0ff,#fff)" }}>
        <div className="container py-3">
          <h1 className="display-6 fw-semibold mb-2">Community Health Advisories</h1>
          <p className="lead text-muted mb-3">
            Stay informed on outbreaks, vaccination campaigns, and health tips in your community.
          </p>
          <div className="row g-2">
            <div className="col-12 col-md-6">
              <input
                className="form-control form-control-lg"
                placeholder="Search advisories..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const params = {};
                    if (selectedCategory) params.category = selectedCategory;
                    // Simple client-side filter on title/content for search
                    loadPosts(params);
                  }
                }}
              />
            </div>
            <div className="col-12 col-md-4">
              <select
                className="form-select form-select-lg"
                value={selectedCategory}
                onChange={(e) => {
                  const val = e.target.value;
                  setSelectedCategory(val);
                  const params = {};
                  if (val) params.category = val;
                  loadPosts(params);
                }}
              >
                <option value="">All categories</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-12 col-md-2 d-grid">
              <button
                className="btn btn-primary btn-lg"
                onClick={() => {
                  const params = {};
                  if (selectedCategory) params.category = selectedCategory;
                  loadPosts(params);
                }}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="h4 mb-0">Latest posts</h2>
          <span className="text-muted">{posts.length} results</span>
        </div>

        {loading ? (
          <div className="row g-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="col-12 col-md-6 col-lg-4">
                <div className="card shadow-sm border-0">
                  <div style={{ height: 150, backgroundColor: "#eef2ff" }} />
                  <div className="card-body">
                    <div className="placeholder-glow">
                      <span className="placeholder col-8"></span>
                      <span className="placeholder col-12 mt-2"></span>
                      <span className="placeholder col-10 mt-1"></span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="alert alert-info">No posts available.</div>
        ) : (
          <div className="row g-3">
            {posts
              .filter((p) => {
                if (!search.trim()) return true;
                const hay = `${p.title} ${p.content}`.toLowerCase();
                return hay.includes(search.toLowerCase());
              })
              .map((post) => (
                <div key={post._id} className="col-12 col-md-6 col-lg-4">
                  <PostCard post={post} onUpdated={() => loadPosts(selectedCategory ? { category: selectedCategory } : {})} />
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
