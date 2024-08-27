import { isExistUser } from "../repository/user.repository.js";
import { auth } from "../../../../config/firebase.config.js";
export async function GetCaseService(uid){
    try{
        return await isExistUser(uid);
    }catch(err){
        console.error("User/GetCaseService error : ",err);
        return false;
    }
}

export async function LoginService(token) {
    try {
      const expiresIn = 60 * 60 * 24 * 5 * 1000;
      const sessionCookie = await auth.createSessionCookie(token, { expiresIn });
      return sessionCookie;
    } catch (err) {
      console.error('Error creating session cookie:', err);
      return null; // 에러 발생 시 null 반환
    }
  }