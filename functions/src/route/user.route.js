import express from 'express';
import { GetCase } from '../api/user/controller/user.controller.js';
import { LoginCheckMiddleWares } from '../middlewares/logincheck.middlewares.js';

export const userRouter = express.Router();
 
userRouter.get("/cases",LoginCheckMiddleWares,GetCase); // 사용자 case 가져오기