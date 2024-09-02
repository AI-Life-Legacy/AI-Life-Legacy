import { auth } from "../../config/firebase.config.js";

export async function LoginCheckMiddleWares(req,res,next){
    try{
        if(!req.cookies.session){
            return res.status(400).json({ error: "로그인 토큰 없음" });
        }   
        await auth
            .verifySessionCookie(req.cookies.session, true) // true는 유효성 검사를 강제함
            .then((decodedToken) => {
                const uid = decodedToken.uid;
                res.locals.uid = uid;
                next();
            })
            .catch((error) => {
                return res.status(400).json({ error: error });
            });
    }catch(err){
        console.error(err);
        return res.status(400).json({ error: error });
    }
}