import { response } from "../../../utils/response/response.js";
import { status } from "../../../utils/response/response.status.js";
import { GetCaseService, LoginService } from "../service/user.service.js";

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
    console.log("로그인 체크");

    const user = res.locals.uid;

    if(user){
      return res.send(response(status.SUCCESS));
    }else{
      return res.send(response(status.NOT_LOGIN_ERROR));
    }
  } catch (err) {
    console.error('User/LoginCheck error : ', err);
    return res.send(response(status.INTERNAL_SERVER_ERROR));
  }
};

export const Login = async (req, res) => {
  try {
    const token = req.body.token;

    console.log('Received token:', token);

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
    console.log('Session cookie issued successfully');
    res.end(JSON.stringify({ status: 'success' }));
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