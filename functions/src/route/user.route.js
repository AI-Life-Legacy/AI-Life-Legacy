import express from 'express';
import { GetCase,Login,LoginCheck, Logout, } from '../api/user/controller/user.controller.js';

export const userRouter = express.Router();
 
userRouter.get("/case",GetCase); // 사용자 case 가져오기
userRouter.get("/logincheck",LoginCheck); // 로그인 체크 
userRouter.post("/login",Login)
userRouter.get("/logout",Logout)