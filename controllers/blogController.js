import { uploadImages } from "../config/multerConfig.js";
import BlogPost from "../models/BlogPost.js";

//Midleware para upload de imagens
export const uploadImage = (req, res, next) => {
  uploadImages(req, res, (err) => {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ message: "Arquivo muito grande (máx. 5MB)" });
      }
      if (err.message.includes('unexpected field')) {
        return res.status(400).json({ 
          message: `Campo inválido no upload. Use apenas 'thumb' e 'blogImg'`,
          received: Object.keys(req.body).concat(Object.keys(req.files || {}))
        });
      }
      return res.status(400).json({ message: err.message });
    }
    next();
  });
};


export const createPost = async (req, res) => {
  try {

    const { blogTitle, authorName,authorResume, date, mainText, quoteText } = req.body;
    
    // Verificar se os arquivos foram enviados corretamente
    if (!req.files || !req.files['thumb']) {
      return res.status(400).json({ message: "Thumbnail é obrigatória" });
    }

    const thumb = `/uploads/thumbs/${req.files['thumb'][0].filename}`;
    const authorProfileImg = req.files['authorProfileImg'] 
      ? `/uploads/authorImgs/${req.files['authorProfileImg'][0].filename}`
      : null;

    const postData = {
      thumb :thumb,
      blogTitle: blogTitle,
      authorProfileImg : authorProfileImg || "/uploads/authorImgs/default.png", // Imagem padrão se não for enviada
      authorName : authorName,
      authorResume : authorResume,
      date: date || new Date(),
      blogTitle : blogTitle,
      mainText : mainText,
      quoteText : quoteText,
      btnText: req.body.btnText || "Continuar Lendo",
      btnIcon: req.body.btnIcon || "fa-solid fa-arrow-right"
    };

    const newPost = new BlogPost(postData);
    const savedPost = await newPost.save();

    res.status(201).json(savedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const getAllPosts = async (req, res) => {
  try {
    const posts = await BlogPost.find();
    res.status(200).json(posts);
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
