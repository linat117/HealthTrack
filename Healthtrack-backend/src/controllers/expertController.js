import Post from "../models/Advisory.js";
import Category from "../models/Category.js";

// Expert creates a post
export const createPost = async (req, res) => {
  try {
    const { title, content, categoryId, imageUrl } = req.body;

    const post = new Post({
      title,
      content,
      category: categoryId || null,
      imageUrl: imageUrl || null,
      createdBy: req.user.id,
    });

    await post.save();
    res.status(201).json({ post });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all posts
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("createdBy", "name role")
      .populate("category", "name")
      .populate("comments.user", "name");
    res.json({ posts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// React to post
export const reactToPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { type } = req.body;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    // Check if user already reacted
    const existing = post.reactions.find(
      (r) => r.user.toString() === req.user.id
    );

    if (existing) {
      existing.type = type; // update reaction
    } else {
      post.reactions.push({ user: req.user.id, type });
    }

    await post.save();
    res.json({ reactions: post.reactions });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Comment on post
export const commentOnPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { comment } = req.body;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    post.comments.push({ user: req.user.id, comment });
    await post.save();

    res.json({ comments: post.comments });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Reply to a comment
export const replyToComment = async (req, res) => {
  try {
    const { postId, commentId } = req.params;
    const { comment } = req.body;
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });
    const target = post.comments.id(commentId);
    if (!target) return res.status(404).json({ message: "Comment not found" });
    if (!target.replies) target.replies = [];
    target.replies.push({ user: req.user.id, comment });
    await post.save();
    res.json({ comments: post.comments });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Expert manage own posts
export const myPosts = async (req, res) => {
  try {
    const posts = await Post.find({ createdBy: req.user.id })
      .populate("category", "name")
      .populate("comments.user", "name")
      .sort({ createdAt: -1 });
    res.json({ posts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, categoryId, imageUrl } = req.body;
    const post = await Post.findOneAndUpdate(
      { _id: id, createdBy: req.user.id },
      { title, content, category: categoryId || null, imageUrl: imageUrl || null },
      { new: true }
    );
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json({ post });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Post.findOneAndDelete({ _id: id, createdBy: req.user.id });
    if (!deleted) return res.status(404).json({ message: "Post not found" });
    res.json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};