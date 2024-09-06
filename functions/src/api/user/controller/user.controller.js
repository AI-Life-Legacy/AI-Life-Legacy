import { response } from "../../../utils/response/response.js";
import { status } from "../../../utils/response/response.status.js";
import { GetCaseService, LoginService } from "../service/user.service.js";
import { auth } from "../../../../config/firebase.config.js";

export const GetCase = async (req,res) => {
  try{
    if(!res.locals.uid){
      return res.json(409).send(response(status.EMPTY_RES_LOCALS_UID));
    }
    const uid = res.locals.uid;

    const result = await GetCaseService(uid);
    if(!result){
      return res.json(402).send(response(status.USER_GETCASE_ERROR));
    }
    return res.send(response(status.SUCCESS,result));
  }catch(err){
    console.error('User/Getacse error : ', err);

    return res.json(500).send(response(status.INTERNAL_SERVER_ERROR));
  }
}

export const LoginCheck = async (req, res) => {
  try {
    if(!req.cookies.session){
      return res.json(400).send(response(status.USER_EMPTY_TOKEN));
    }
    await auth
      .verifySessionCookie(req.cookies.session, true) // true는 유효성 검사를 강제함
      .then((decodedToken) => {
          return res.send(response(status.SUCCESS, decodedToken));
      })
      .catch((error) => {
          return res.status(401).send(response(status.USER_TOKEN_UNAUTHORIZED));
      });
  } catch (err) {
    console.error('User/LoginCheck error : ', err);
    return res.json(500).send(response(status.INTERNAL_SERVER_ERROR));
  }
};

export const Login = async (req, res) => {
  try {
    const token = req.body.token;

    if (!token) {
      return res.json(400).send(response(status.USER_EMPTY_TOKEN));
    }

    const sessionCookie = await LoginService(token);

    if (!sessionCookie) {
      return res.json(401).send(response(status.USER_CREATE_TOKEN_ERROR));
    }

    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    const options = { maxAge: expiresIn, httpOnly: true, secure: true, sameSite: 'None' };
    
    res.cookie('session', sessionCookie, options);
    
    return res.send(response(status.SUCCESS));
  } catch (err) {
    console.error('User/Login error:', err);
    return res.json(500).send(response(status.INTERNAL_SERVER_ERROR));
  }
}

export async function Logout(req,res) {
  try{
    res.clearCookie('session',{ httpOnly: true, secure: true, sameSite: 'None'});
    return res.send(response(status.SUCCESS));
  }catch(err){
    console.error(err);
    return res.json(500).send(response(status.INTERNAL_SERVER_ERROR));
  }
}