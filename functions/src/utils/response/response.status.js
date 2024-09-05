import { StatusCodes } from "http-status-codes";

export const status = {
    // success
    SUCCESS: {status: StatusCodes.OK, "isSuccess": true, "code": "200", "message": "success!"},    
    
    // error
    // common err
    BAD_REQUEST: {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": "400", "message": "잘못된 요청입니다." },
    UNAUTHORIZED: {status: StatusCodes.UNAUTHORIZED, "isSuccess": false, "code": "401", "message": "권한이 잘못되었습니다." },
    FORBIDDEN: {status: StatusCodes.FORBIDDEN, "isSuccess": false, "code": "403", "message": "금지된 요청입니다." },
    INTERNAL_SERVER_ERROR: {status: StatusCodes.INTERNAL_SERVER_ERROR, "isSuccess": false, "code": "500", "message": "서버 에러, 관리자에게 문의 바랍니다." },
	EMPTY_REQUEST_BODY: {status: StatusCodes.INTERNAL_SERVER_ERROR, "isSuccess": false, "code": "402", "message": "req.body 값이 존재하지 않습니다." },

    EMPTY_RES_LOCALS_UID: {status: StatusCodes.CONFLICT, "isSuccess": false, "code": "COMMON1", "message": "잘못된 경로입니다." },
    
    // chatGPT err
    CHATGPT_DATA_NOT_FOUND: {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": "400", "message": "chat gpt: Data가 없습니다."},
    CHATGPT_GET_QUERY_ERROR: {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": "400", "message": "chat gpt: 데이터 불러오기 쿼리에 오류가 발생했습니다."},

    // autobiography err
    AUTOBIOGRAPHY_DATA_NOT_FOUND: {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": "400", "message": "자서전: Data가 없습니다."},
    AUTOBIOGRAPHY_SAVE_ERROR: {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": "400", "message": "자서전: 데이터를 저장하던 중 오류가 발생했습니다."},
    AUTOBIOGRAPHY_GET_ERROR: {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": "400", "message": "자서전: 데이터 불러오던 중 오류가 발생했습니다."},
    AUTOBIOGRAPHY_NO_DATA: {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": "400", "message": "자서전: 작성하신 데이터가 없습니다."},
    
    // user err
    USER_GETCASE_ERROR: {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": "400", "message": "유저 : 사용자 Case를 불러오는 중 오류가 발생했습니다."},
    USER_EMPTY_TOKEN: {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": "400", "message": "유저 : 토큰이 비어 있습니다."},
    USER_TOKEN_UNAUTHORIZED : {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": "400", "message": "유저 : 유효하지 않은 토큰입니다."},
    USER_CREATE_TOKEN_ERROR: {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": "400", "message": "유저 : 토큰 생성에 실패했습니다."},
    // myprofile err
    MYPROFILE_DATA_NOT_FOUND: {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": "400", "message": "내 프로필 : Data가 없습니다."},
    MYPROFILE_SAVE_ERROR: {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": "400", "message": "내 프로필 : 데이터를 저장하던 중 오류가 발생했습니다."},
    MYPROFILE_GET_ERROR: {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": "400", "message": "내 프로필 : 데이터 불러오던 중 오류가 발생했습니다."},
    
    // login err
 
    // authentication err
    LOGIN_CHECK_TOKEN_EMPTY: {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": "LOGIN_CHECK_ERROR1", "message": "로그인 토큰이 존재하지 않습니다."},
    LOGIN_CHECK_TOKEN_UNAUTHORIZED: {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": "LOGIN_CHECK_ERROR2", "message": "로그인 토큰이 존재하지 않습니다."},
    
}