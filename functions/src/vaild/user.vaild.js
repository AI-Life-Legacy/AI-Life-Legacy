import Joi from "joi";

// User 관련 Joi 스키마 정의
export const loginTokenSchema = Joi.object({
  token: Joi.string().required().messages({
    'any.required': '목차 번호가 필요합니다.'
  })
});

