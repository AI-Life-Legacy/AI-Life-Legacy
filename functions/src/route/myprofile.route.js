import express from 'express';
import { GetMainQuestion, GetUserMainQuestion, SaveMainQuestion } from '../api/myprofile/controller/myprofile.controller.js';

export const myprofileRouter = express.Router();


myprofileRouter.get("/",GetUserMainQuestion); // 사용자 맞춤형 목차 Uid DB에서 가져오기
myprofileRouter.get("/:caseNum",GetMainQuestion); // 사용자 맞춤형 목차 공용 DB에서 가져오기
myprofileRouter.post("/save",SaveMainQuestion); // 사용자 맞춤형 목차 Uid 저장 로직