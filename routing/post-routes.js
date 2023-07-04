import {Router} from "express";
import {
    updatePost,
    getAllPosts,
    addPost,
    getPostById,
    deletePost
} from "../controllers/post-controllers.js";
const router = Router()

router.delete('/:id', deletePost).put('/:id', updatePost).get('/', getAllPosts).post('/', addPost).get('/:id', getPostById)
export default router
