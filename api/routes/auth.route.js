import express from "express"
import { signup ,signin, google, signOut } from "../controllers/auth.controller.js"


const router = express.Router()

router.post('/signup',signup)
router.post('/signin',signin)
router.post('/google',google)
router.post('/signout',signOut)


export default router