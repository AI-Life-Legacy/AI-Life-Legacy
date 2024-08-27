import express from 'express';
import { Combine, MakeCase, MakeReQuestionData } from '../api/chatgpt/controller/chatgpt.controller.js';

export const chatGptRouter = express.Router();

chatGptRouter.post("/makeCase", MakeCase); // 사용자 Case 만들고 저장
chatGptRouter.post("/makeReQuestion", MakeReQuestionData); // 사용자 1차 답변에 따른 2차 답변 
chatGptRouter.post("/combine", Combine); // 사용자 1차 답변과 2차 답변 합쳐서 보내주기