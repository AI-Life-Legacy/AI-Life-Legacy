import express from 'express';
import { GetCase } from '../api/user/controller/user.controller.js';

export const userRouter = express.Router();
 
userRouter.get("/cases",GetCase); // 사용자 case 가져오기