import BlogPost from "../models/BlogPost.js";
import { uploadBlogImage } from "../config/multerConfig.js";

// Middleware para upload de imagem
export const uploadImage = (req, res, next) => {
  uploadBlogImage(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    next();
  });
};

// Criar um novo post
export const createPost = async (req, res) => {
  try {
    const { body, file } = req;

    const postData = {
      ...body,
      blogImg: file ? `/uploads/blog-images/${file.filename}` : null,
    };

    const newPost = new BlogPost(postData);
    const savedPost = await newPost.save();

    res.status(201).json(savedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obter todos os posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await BlogPost.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obter um post por ID
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

// Atualizar um post
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

// Deletar um post
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
