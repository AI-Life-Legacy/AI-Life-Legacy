import { response } from "../../../utils/response/response.js";
import { status } from "../../../utils/response/response.status.js";
import { GetCaseService, LoginService } from "../service/user.service.js";
import { auth } from "../../../../config/firebase.config.js";

export const GetCase = async (req,res) => {
  try{
    if(!res.locals.uid){
      return res.send(response(status.NOT_LOGIN_ERROR));
    }
    const uid = res.locals.uid;

    const result = await GetCaseService(uid);
    if(!result){
      return 
    }
    return res.send(response(status.SUCCESS,result));
  }catch(err){
    console.error('User/Getacse error : ', err);

    return res.send(response(status.INTERNAL_SERVER_ERROR));
  }
}

export const LoginCheck = async (req, res) => {
  try {
    await auth
      .verifySessionCookie(req.cookies.session, true) // true는 유효성 검사를 강제함
      .then((decodedToken) => {
          return res.send(response(status.SUCCESS, decodedToken));
      })
      .catch((error) => {
          return res.status(400).json({ error: error });
      });

  } catch (err) {
    console.error('User/LoginCheck error : ', err);
    return res.send(response(status.INTERNAL_SERVER_ERROR));
  }
};

export const Login = async (req, res) => {
  try {
    const token = req.body.token;

    if (!token) {
      return res.send(response(status.USER_EMPTY_TOKEN));
    }

    const sessionCookie = await LoginService(token);

    if (!sessionCookie) {
      return res.send(response(status.INTERNAL_SERVER_ERROR));
    }

    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    const options = { maxAge: expiresIn, httpOnly: true, secure: true, sameSite: 'None' };
    
    res.cookie('session', sessionCookie, options);
    
    return res.send(response(status.SUCCESS));
  } catch (err) {
    console.error('User/Login error:', err);
    return res.send(response(status.INTERNAL_SERVER_ERROR));
  }
}

export async function Logout(req,res) {
  try{
    res.clearCookie('session',{ secure: true, sameSite: 'None', httpOnly: true});
    res.end(JSON.stringify({ status: 'success' }));
  }catch(err){
    console.error(err);
    return res.send(response(status.INTERNAL_SERVER_ERROR));
  }
}