import { uploadImages } from "../config/multerConfig.js";
import { createPost, getPaginatedPosts } from "../services/blogService.js";
import BlogPost from "../models/BlogPost.js";

//Midleware para upload de imagens
export const uploadImage = (req, res, next) => {
  uploadImages(req, res, (err) => {
    if (err) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res
          .status(400)
          .json({ message: "Arquivo muito grande (máx. 5MB)" });
      }
      if (err.message.includes("unexpected field")) {
        return res.status(400).json({
          message: `Campo inválido no upload. Use apenas 'thumb' e 'blogImg'`,
          received: Object.keys(req.body).concat(Object.keys(req.files || {})),
        });
      }
      return res.status(400).json({ message: err.message });
    }
    next();
  });
};

export const createBlogPost = async (req, res) => {
  try {
    const result = await createPost(req);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await getPaginatedPosts(req);

    res.status(200).json({
      success: true,
      currentPage: posts.currentPage,
      totalPages: posts.totalPages,
      totalPosts: posts.totalPosts,
      posts: posts.posts,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPostById = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post não encontrado" });
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const updatedPost = await BlogPost.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: "Post não encontrado" });
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const deletedPost = await BlogPost.findByIdAndDelete(req.params.id);

    if (!deletedPost) {
      return res.status(404).json({ message: "Post não encontrado" });
    }

    res.status(200).json({ message: "Post deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
