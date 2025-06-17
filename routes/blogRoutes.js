import { Router } from "express";
const router = Router();
import {
  getAllPosts,
  getPostById,
  updatePost,
  // uploadImage,
  deletePost,
  createBlogPost,
} from "../controllers/blogController.js";

// Rotas CRUD
router.post("/posts", createBlogPost);
router.get("/posts", getAllPosts);
router.get("/posts/:id", getPostById);
router.put("/posts/:id", updatePost);
router.delete("/posts/:id", deletePost);

export default router;
