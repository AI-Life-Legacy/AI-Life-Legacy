import { response } from "../../../utils/response/response.js";
import { status } from "../../../utils/response/response.status.js";
import { GetMainQuestionService, GetUserMainQuestionService, SaveMainQuestionService } from "../service/myprofile.service.js";

export async function SaveMainQuestion(req, res) {
    if(!res.locals.uid){
      return res.json(409).send(response(status.EMPTY_RES_LOCALS_UID));
    }
    const {data,caseNum} = req.body;
    const uid = res.locals.uid;
    try{
        if(!data||!caseNum){
            return res.json(402).send(response(status.MYPROFILE_DATA_NOT_FOUND));
        }
        const result = await SaveMainQuestionService(uid,data,caseNum);
    
        if(!result){
            return res.json(403).send(response(status.MYPROFILE_SAVE_ERROR));
        }
    
        return res.send(response(status.SUCCESS));
    }catch(err){
        console.log(err);
        return res.json(500).send(response(status.INTERNAL_SERVER_ERROR));
    }
}   

export async function GetMainQuestion(req, res) {
    if(!res.locals.uid){
      return res.json(409).send(response(status.EMPTY_RES_LOCALS_UID));
    }

    const { caseNum } = req.params;

    try{
        const result = await GetMainQuestionService(caseNum);

        if(!result){
            return res.json(402).send(response(status.MYPROFILE_GET_ERROR));
        }

        return res.send(response(status.SUCCESS,result));
    }catch(err){
        console.log(err);
        return res.json(500).send(response(status.INTERNAL_SERVER_ERROR));
    }
}   

export async function GetUserMainQuestion(req, res) {
    if(!res.locals.uid){
      return res.json(409).send(response(status.EMPTY_RES_LOCALS_UID));
    }
    const uid = res.locals.uid;
    try{
        const result = await GetUserMainQuestionService(uid);

        if(!result){
            return res.json(402).send(response(status.MYPROFILE_GET_ERROR));
        }

        return res.send(response(status.SUCCESS));
    }catch(err){
        console.log(err);
        return res.json(500).send(response(status.INTERNAL_SERVER_ERROR));
    }
}   