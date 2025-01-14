import express from "express";
import { login, logout, signup, status } from "../controller/user.js";
const router = express.Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/status").get(status);

export default router;
