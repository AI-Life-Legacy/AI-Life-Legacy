import express from 'express';
import { CheckAnswerData,CheckAnswerPageData,GetWriteData,SaveAnswerData, SaveWriteData } from '../api/write/controller/write.controller.js';

export const writeRouter = express.Router();

writeRouter.get("/check",CheckAnswerData); // 자서전 작성 데이터가 있는지 확인하는 로직
writeRouter.get("/check/:mainQuestionId",CheckAnswerPageData); // 해당 mainQuestionId 자서전 작성 데이터가 있는지 확인하는 로직 전부 작성했을 경우 "true" 하나라도 안하면 "false" 
writeRouter.post("/save",SaveAnswerData); // 자서전 작성 데이터 저장
writeRouter.get("/:mainId/:subId",GetWriteData); // main,sub id에 맞는 자서전 작성 데이터 불러오기  
writeRouter.patch("/",SaveWriteData); // 자서전 수정 데이터 저장