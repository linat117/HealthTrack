import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAdvisories } from "../../api/api.js";
import PostCard from "../../components/PostCard.jsx";

const ManagerPosts = () => {
  const { managerUserId } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      try {
        const data = await getAdvisories({ createdBy: managerUserId });
        setPosts(data);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [managerUserId]);

  if (loading) return <div className="container my-4">Loading...</div>;

  return (
    <div className="container my-4">
      <h3 className="mb-3">Manager Posts</h3>
      {posts.length === 0 ? (
        <div className="alert alert-info mb-0">No posts by this manager.</div>
      ) : (
        posts.map((p) => <PostCard key={p._id} post={p} />)
      )}
    </div>
  );
};

export default ManagerPosts;


