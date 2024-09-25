import Joi from "joi";

export const writeDataDTO = Joi.object({
    data: Joi.string().required().messages({
        'any.required': '사용자 답변이 필요합니다.'
    }),
    mainQuestionId: Joi.string().required().messages({
        'any.required': '목차 번호가 필요합니다.'
    }),
    subQuestionId: Joi.string().required().messages({
        'any.required': '질문 번호가 필요합니다.'
    }),
    question: Joi.string().required().messages({
        'any.required': '질문 데이터가 필요합니다.'
    })
});

export const questionIdDTO = Joi.object({
    mainId: Joi.string().required().messages({
        'any.required': '목차 번호가 필요합니다.'
    }),
    subId: Joi.string().required().messages({
        'any.required': '질문 번호가 필요합니다.'
    })
})

export const patchDataDTO = Joi.object({
    mainId: Joi.string().required().messages({
        'any.required': '목차 번호가 필요합니다.'
    }),
    subId: Joi.string().required().messages({
        'any.required': '질문 번호가 필요합니다.'
    }),
    data: Joi.string().required().messages({
        'any.required': '사용자 답변이 필요합니다.'
    }),
})