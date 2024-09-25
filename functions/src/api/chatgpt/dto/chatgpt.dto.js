import Joi from "joi";

export const combineDTO = Joi.object({
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