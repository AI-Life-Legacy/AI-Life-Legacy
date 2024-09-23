import { response } from "../../../utils/response/response.js";
import { status } from "../../../utils/response/response.status.js";
import { GetMainQuestionService, GetUserMainQuestionService, SaveMainQuestionService } from "../service/myprofile.service.js";

export async function GetUserMainQuestion(req, res) {
    try{
        if (!checkUidInLocals(res)) {
            return res.status(409).json(response(status.EMPTY_RES_LOCALS_UID));
        }

        await GetUserMainQuestionService(res.locals.uid);

        return res.json(response(status.SUCCESS));
    }catch(err){
        if(err.message == 'DATA_NOT_FOUND'){
            return res.status(404).json(response(status.MYPROFILE_GET_ERROR));
        }
        console.log("myprofile / GetUserMainQuestion Controller error:",err);
        return res.status(500).json(response(status.INTERNAL_SERVER_ERROR));
    }
}   

export async function SaveMainQuestion(req, res) {
    try{
        if (!checkUidInLocals(res)) {
            return res.status(409).json(response(status.EMPTY_RES_LOCALS_UID));
        }

        const {data,caseNum} = req.body;
        if(!data||!caseNum){
            return res.status(400).json(response(status.MYPROFILE_DATA_NOT_FOUND));
        }

        await SaveMainQuestionService(res.locals.uid,data,caseNum);
        return res.json(response(status.SUCCESS));
    }catch(err){
        console.log("myprofile/SaveMainQuestion error:",err);
        return res.status(500).json(response(status.INTERNAL_SERVER_ERROR));
    }
}   

export async function GetMainQuestion(req, res) {
    try{
        if (!checkUidInLocals(res)) {
            return res.status(409).json(response(status.EMPTY_RES_LOCALS_UID));
        }

        const { caseNum } = req.params;
        if(!caseNum){
            return res.status(400).json(response(status.MYPROFILE_EMPTY_DATA));
        }

        const result = await GetMainQuestionService(caseNum);
        return res.json(response(status.SUCCESS,result));
    }catch(err){
        if(err.message == 'DATA_NOT_FOUND'){
            return res.status(404).json(response(status.MYPROFILE_DATA_NOT_FOUND));
        }
        console.log(err);
        return res.status(500).json(response(status.INTERNAL_SERVER_ERROR));
    }
}   