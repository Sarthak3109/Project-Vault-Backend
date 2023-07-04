import { Router } from "express";
import { getAllUsers,signup, login, getUserById } from "../controllers/user-controllers.js";
const router = Router()

router.get('/', getAllUsers ).post('/signup', signup).post('/login', login).get('/:id', getUserById)
export default router