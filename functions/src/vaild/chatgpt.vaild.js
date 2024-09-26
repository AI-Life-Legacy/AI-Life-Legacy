import Joi from "joi";

export const combineSchema = Joi.object({
    question1: Joi.string().required().messages({
        'any.required': '첫 번째 질문이 필요합니다.'
    }),
    question2: Joi.string().required().messages({
        'any.required': '두 번째 질문이 필요합니다.'
    }),
    data1: Joi.string().required().messages({
        'any.required': '첫 번째 답변이 필요합니다.'
    }),
    data2: Joi.string().required().messages({
        'any.required': '두 번째 답변이 필요합니다.'
    })
});

export const makeCaseSchema = Joi.object({
    data: Joi.string().required().messages({
        'any.required': '사용자 답변이 필요합니다.'
    })
});

export const makeReQuestionSchema = Joi.object({
    question: Joi.string().required().messages({
        'any.required': '첫 번째 질문이 필요합니다.'
    }),
    data: Joi.string().required().messages({
        'any.required': '사용자 답변이 필요합니다.'
    })
});