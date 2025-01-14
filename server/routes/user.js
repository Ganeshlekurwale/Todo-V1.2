import express from "express";
import { login, logout, register, status } from "../controller/user.js";
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/status").get(status);

export default router;
