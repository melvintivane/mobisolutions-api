import BlogPost from "../models/BlogPost.js";

export const createPost = async (req) => {
  try {
    // Validação básica dos campos obrigatórios
    if (!req.files || !req.files["thumb"]) {
      throw new Error("Thumbnail image is required");
    }

    // Extrai dados do corpo da requisição
    const {
      blogTitle,
      authorName,
      authorResume,
      mainText,
      quoteText,
      btnText = "Continuar Lendo",
      btnIcon = "fa-solid fa-arrow-right",
    } = req.body;

    // Processamento dos arquivos
    const thumb = `/uploads/thumbs/${req.files["thumb"][0].filename}`;
    const authorProfileImg = req.files["authorProfileImg"]
      ? `/uploads/authorImgs/${req.files["authorProfileImg"][0].filename}`
      : "/uploads/authorImgs/default.png";

    // Cria objeto com os dados do post
    const postData = {
      thumb,
      blogTitle,
      authorProfileImg,
      authorName,
      authorResume,
      date: new Date(),
      mainText,
      quoteText,
      btnText,
      btnIcon,
    };

    // Validação adicional antes de criar
    if (!blogTitle || !authorName || !mainText) {
      throw new Error("Title, author name and main text are required fields");
    }

    const newPost = new BlogPost(postData);
    const savedPost = await newPost.save();

    return {
      success: true,
      post: savedPost,
    };
  } catch (error) {
    console.error("Error creating post:", error);
    throw new Error(error.message || "Failed to create blog post");
  }
};

export const getPaginatedPosts = async (req) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const posts = await BlogPost.find().skip(skip).limit(limit);

    const totalPosts = await BlogPost.countDocuments();
    const totalPages = Math.ceil(totalPosts / limit);

    return {
      success: true,
      currentPage: page,
      totalPages,
      totalPosts,
      posts,
    };
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error(error.message || "Failed to fetch blog posts");
  }
};
