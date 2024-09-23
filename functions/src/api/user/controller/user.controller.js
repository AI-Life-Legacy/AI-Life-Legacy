import { response } from "../../../utils/response/response.js";
import { status } from "../../../utils/response/response.status.js";
import { GetCaseService, LoginService } from "../service/user.service.js";
import { auth } from "../../../../config/firebase.config.js";
import { checkUidInLocals } from "../../../utils/validators/logincheck.js";
import { COOKIE_EXPIRES_IN } from "../../../utils/const/constants.js";

export const GetCase = async (req, res) => {
  try {
    // UID 검증 함수 호출
    if (!checkUidInLocals(res)) {
      return res.status(409).json(response(status.EMPTY_RES_LOCALS_UID));
    }

    // 유저 케이스 가져오기
    const result = await GetCaseService(res.locals.uid);
    
    // 성공 응답
    return res.status(200).json(response(status.SUCCESS, result));
  } catch (err) {
    // 예외 처리
    if (err.message === 'USER_NOT_FOUND') {
      return res.status(402).json(response(status.USER_GETCASE_ERROR));
    }
    console.error('User/GetCase error: ', err);
    return res.status(500).json(response(status.INTERNAL_SERVER_ERROR));
  }
};

export const LoginCheck = async (req, res) => {
  try {
    // 쿠키가 없는 경우 400 에러 응답
    if (!req.cookies.session) {
      return res.status(400).json(response(status.USER_EMPTY_TOKEN));
    }

    // 세션 쿠키 검증
    const decodedToken = await auth.verifySessionCookie(req.cookies.session, true); // 유효성 강제 검증
    return res.status(200).json(response(status.SUCCESS, decodedToken));

  } catch (err) {
    // 토큰 유효성 에러 처리
    if (err.code === 'auth/argument-error') {
      return res.status(401).json(response(status.USER_TOKEN_UNAUTHORIZED));
    }

    // 서버 내부 에러 처리
    console.error('User/LoginCheck error : ', err);
    return res.status(500).json(response(status.INTERNAL_SERVER_ERROR));
  }
};

export const Login = async (req, res) => {
  try {
    // 토큰 검증
    if (!req.body.token) {
      return res.status(400).json(response(status.USER_EMPTY_TOKEN));
    }

    // 세션 쿠키 생성
    const sessionCookie = await LoginService(req.body.token);

    // 세션 쿠키가 성공적으로 생성되면 쿠키 설정 및 응답
    const options = { maxAge: COOKIE_EXPIRES_IN, httpOnly: true, secure: true, sameSite: 'None' };
    res.cookie('session', sessionCookie, options);
    
    return res.json(response(status.SUCCESS));
  } catch (err) {
    // CREATE_TOKEN_ERR 처리
    if (err.message === 'CREATE_TOKEN_ERR') {
      return res.status(401).json(response(status.USER_CREATE_TOKEN_ERROR));
    }

    // 그 외 서버 에러 처리
    console.error('User/Login error:', err);
    return res.status(500).json(response(status.INTERNAL_SERVER_ERROR));
  }
};

export async function Logout(req, res) {
  try {
    // 세션 쿠키 제거
    res.clearCookie('session', { httpOnly: true, secure: true, sameSite: 'None' });

    // 로그아웃 성공 응답
    return res.json(response(status.SUCCESS));
  } catch (err) {
    console.error('User/Logout error:', err);

    // 서버 에러 처리
    return res.status(500).json(response(status.INTERNAL_SERVER_ERROR));
  }
}