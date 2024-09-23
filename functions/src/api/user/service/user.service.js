import { isExistUser } from "../repository/user.repository.js";
import { auth } from "../../../../config/firebase.config.js";
import { SESSION_EXPIRES_IN } from "../../../utils/const/constants.js";
export async function GetCaseService(uid) {
  try {
      const userCase = await isExistUser(uid);
      if (!userCase) {
          throw new Error('USER_NOT_FOUND'); // 사용자 존재하지 않음 예외
      }
      return userCase;
  } catch (err) {
      console.error("User/GetCaseService error: ", err);
      throw err; // 예외를 상위로 던짐 (Controller로)
  }
}

export async function LoginService(token) {
  try {
    // 세션 쿠키 생성
    const sessionCookie = await auth.createSessionCookie(token, { expiresIn: SESSION_EXPIRES_IN });
    return sessionCookie;
  } catch (err) {
    console.error('User/LoginService error:', err);
    // 세션 쿠키 생성 실패 시 명확한 에러 메시지
    throw new Error('CREATE_TOKEN_ERR');
  }
}
