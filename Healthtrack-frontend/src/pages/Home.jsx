import React, { useEffect, useState } from "react";
import PostCard from "../components/PostCard.jsx";
import { getAdvisories } from "../api/api.js";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getAdvisories();
        setPosts(data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <h1 className="mb-4 text-black">Health Advisories</h1>
      {posts.length === 0 ? (
        <p className="text-dark">No posts available.</p>
      ) : (
        posts.map((post) => <PostCard key={post._id} post={post} />)
      )}
    </div>
  );
};

export default Home;
