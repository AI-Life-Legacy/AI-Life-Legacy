import { auth } from "../../config/firebase.config.js";
import { response } from "../utils/response/response.js";
import { status } from "../utils/response/response.status.js";

export async function LoginCheckMiddleWares(req,res,next){
    try{
        if(!req.cookies.session){
            return res.status(400).send(response(status.LOGIN_CHECK_TOKEN_EMPTY));
        }   
        await auth
            .verifySessionCookie(req.cookies.session, true) // true는 유효성 검사를 강제함
            .then((decodedToken) => {
                const uid = decodedToken.uid;
                res.locals.uid = uid;
                next();
            })
            .catch((err) => {
                console.error(err);
                return res.status(401).send(response(status.LOGIN_CHECK_TOKEN_UNAUTHORIZED));
            });
    }catch(err){
        console.error(err);
        return res.status(500).send(response(status.INTERNAL_SERVER_ERROR));
    }
}