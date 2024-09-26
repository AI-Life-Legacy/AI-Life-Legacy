import Joi from "joi";

// User 관련 Joi 스키마 정의
export const saveMainQuestionSchema = Joi.object({
    data: Joi.string().required().messages({
        'any.required': '자기소개 데이터가 필요합니다.'
    }),
    caseNum: Joi.string().required().messages({
        'any.required': '사용자 Case 번호가 필요합니다.'
    }),
});

export const getMainQuestionSchema = Joi.object({
    caseNum: Joi.string().required().messages({
        'any.required': '사용자 Case 번호가 필요합니다.'
    }),
});