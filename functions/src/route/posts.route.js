import express from 'express';
import { checkPostData, checkPostPageData, checkWrittenPages, getPostData, savePostData, updatePostData } from '../api/posts/controller/posts.controller.js';

export const postsRouter = express.Router();

// 자서전 데이터 저장 로직 (포스트 작성 데이터 저장)
postsRouter.post("/", savePostData); // 포스트 작성 데이터 저장

// 자서전 데이터 체크 로직 (내 프로필 페이지에서 포스트 작성 여부 확인)
postsRouter.get("/check", checkPostData); // 프로필 페이지에서 포스트 작성 여부 확인

// 특정 페이지 작성 여부 체크 (포스트 작성 페이지)
postsRouter.get("/check/:mainQuestionId", checkPostPageData); // 포스트 페이지 작성 여부 체크

// 작성된 페이지 범위 확인
postsRouter.get("/check/page", checkWrittenPages); // 작성된 페이지 범위 확인

// 특정 mainId와 subId에 맞는 포스트 작성 데이터 불러오기
postsRouter.get("/:mainId/:subId", getPostData); // mainId, subId에 맞는 포스트 작성 데이터 불러오기

// 포스트 수정 데이터 저장
postsRouter.patch("/", updatePostData); // 포스트 수정 데이터 저장

