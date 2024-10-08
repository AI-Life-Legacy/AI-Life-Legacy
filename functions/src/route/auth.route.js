import express from 'express';
import { LoginCheckMiddleWares } from '../middlewares/logincheck.middlewares.js';
import { Login, LoginCheck, Logout } from '../api/auth/controller/auth.controller.js';

export const authRouter = express.Router();
 
authRouter.get("/status",LoginCheck); // 로그인 체크 
authRouter.post("/login",Login); // 로그인 토큰 생성 
authRouter.get("/logout",LoginCheckMiddleWares,Logout); // 로그아웃 