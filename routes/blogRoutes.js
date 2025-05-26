import { Router } from "express";
const router = Router();
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  uploadImage,
  deletePost,
} from "../controllers/blogController.js";

// Rotas CRUD
router.post("/posts", uploadImage, createPost);
router.get("/posts", getAllPosts);
router.get("/posts/:id", getPostById);
router.put("/posts/:id", uploadImage, updatePost);
router.delete("/posts/:id", deletePost);

export default router;
