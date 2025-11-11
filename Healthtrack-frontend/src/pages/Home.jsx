import React, { useEffect, useState } from "react";
import PostCard from "../components/PostCard.jsx";
import axios from "axios";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch posts from backend
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/posts");
        setPosts(res.data);
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
