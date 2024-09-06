import express from 'express';
import { CheckAnswerData,CheckAnswerPageData,CheckPageData,GetWriteData,PatchWriteData,SaveAnswerData } from '../api/write/controller/write.controller.js';

export const writeRouter = express.Router();

// 자서전 데이터 저장 로직 
writeRouter.post("/save",SaveAnswerData); // 자서전 작성 데이터 저장

// 자서전 데이터 체크 로직 
writeRouter.get("/check",CheckAnswerData); // 내 프로필 보기 페이지에서 자서전을 작성한 
writeRouter.get("/check/:mainQuestionId",CheckAnswerPageData); // 자서전 작성 페이지에서 해당 페이지를 작성했는지 체크할 때 사용
writeRouter.get("/check/page",CheckPageData); //

// 자서전 데이터 수정 로직 
writeRouter.get("/:mainId/:subId",GetWriteData); // main,sub id에 맞는 자서전 작성 데이터 불러오기  
writeRouter.patch("/",PatchWriteData); // 자서전 수정 데이터 저장