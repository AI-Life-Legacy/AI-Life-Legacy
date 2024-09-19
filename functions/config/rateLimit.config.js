import rateLimit from 'express-rate-limit';

// API 호출 제한 설정
export const commonApiLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10분
    max: 40, // 각 IP당 최대 3번의 요청 허용
    message: 'Too many requests from this IP, please try again after 10 minutes.',
    statusCode: 403, // 429 대신 403 Forbidden 상태 코드를 반환
    headers: true, // X-RateLimit-* 헤더를 추가
});

export const chatGPTApiLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5분
    max: 20, // 각 IP당 최대 20번의 요청 허용
    message: 'Too many requests from this IP, please try again after 5 minutes.',
    statusCode: 429, 
    headers: true, // X-RateLimit-* 헤더를 추가
});
