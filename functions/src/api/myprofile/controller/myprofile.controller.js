import { response } from "../../../utils/response/response.js";
import { status } from "../../../utils/response/response.status.js";
import { GetMainQuestionService, GetUserMainQuestionService, SaveMainQuestionService } from "../service/myprofile.service.js";

export async function SaveMainQuestion(req, res) {
    if(!res.locals.uid){
        return res.send(response(status.NOT_LOGIN_ERROR));
    }
    const {data,caseNum} = req.body;
    const uid = res.locals.uid;
    try{
        if(!data){
            return res.send(response(status.MYPROFILE_DATA_NOT_FOUND));
        }
        const result = await SaveMainQuestionService(uid,data,caseNum);
    
        if(!result){
            return res.send(response(status.MYPROFILE_SAVE_ERROR));
        }
    
        return res.send(response(status.SUCCESS));
    }catch(err){
        console.log(err);
        return res.send(response(status.INTERNAL_SERVER_ERROR));
    }
}   

export async function GetMainQuestion(req, res) {
    if(!res.locals.uid){
        return res.send(response(status.NOT_LOGIN_ERROR));
    }

    const { caseNum } = req.params;

    try{
        const result = await GetMainQuestionService(caseNum);

        if(!result){
            return res.send(response(status.MYPROFILE_SAVE_ERROR));
        }

        return res.send(response(status.SUCCESS,result));
    }catch(err){
        console.log(err);
        return res.send(response(status.INTERNAL_SERVER_ERROR));
    }
}   

export async function GetUserMainQuestion(req, res) {
    if(!res.locals.uid){
        return res.send(response(status.NOT_LOGIN_ERROR));
    }
    const uid = res.locals.uid;
    try{
        const result = await GetUserMainQuestionService(uid);

        if(!result){
            return res.send(response(status.MYPROFILE_SAVE_ERROR));
        }

        return res.send(response(status.SUCCESS,result));
    }catch(err){
        console.log(err);
        return res.send(response(status.INTERNAL_SERVER_ERROR));
    }
}   