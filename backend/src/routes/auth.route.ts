import express from "express";
import { signup } from "../controllers/auth.controller.ts";

const router = express.Router();

router.get('/signup', signup)
router.get('/login', (req,res) => {
    res.send("Login Router");
})
router.get('/logout', (req,res) => {
    res.send("Logout Router");
})

export default router;