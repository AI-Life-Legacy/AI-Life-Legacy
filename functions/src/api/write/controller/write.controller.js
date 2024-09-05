import { response } from "../../../utils/response/response.js";
import { status } from "../../../utils/response/response.status.js";
import { CheckAnswerPageDataService, SaveAnswerDataService, CheckAnswerDataService, GetWriteDataService, PatchWriteDataService} from "../service/write.service.js";

export async function GetWriteData(req,res){
    try{
        if(!res.locals.uid){
            return res.json(409).send(response(status.EMPTY_RES_LOCALS_UID));
        }
        const uid = res.locals.uid;

        const {mainId,subId} = req.params;
        if(!mainId,!subId){
            return res.json(402).send(response(status.EMPTY_REQUEST_BODY));
        }
        const result = await GetWriteDataService(uid,mainId,subId);
        
        if(!result){
            return res.json(403).send(response(status.AUTOBIOGRAPHY_SAVE_ERROR));
        }
        return res.send(response(status.SUCCESS,result));

    }catch(err){
        console.log(err);
        return res.json(500).send(response(status.INTERNAL_SERVER_ERROR));
    }
}

export async function PatchWriteData(req,res){
    try{
        if(!res.locals.uid){
            return res.json(409).send(response(status.EMPTY_RES_LOCALS_UID));
        }
        const uid = res.locals.uid;

        const {mainId,subId,data} = req.body;

        if(!mainId,!subId,!data){
            return res.json(402).send(response(status.EMPTY_REQUEST_BODY));
        }
        const result = await PatchWriteDataService(uid,mainId,subId,data);
        
        if(!result){
            return res.json(403).send(response(status.AUTOBIOGRAPHY_SAVE_ERROR));
        }

        return res.send(response(status.SUCCESS));

    }catch(err){
        console.log(err);
        return res.json(500).send(response(status.INTERNAL_SERVER_ERROR));
    }
}

export async function SaveAnswerData(req,res){
    try{
        if(!res.locals.uid){
            return res.json(409).send(response(status.EMPTY_RES_LOCALS_UID));
        }
        const uid = res.locals.uid;
        const {data,mainQuestionId,subQuestionId,question} = req.body;

        if(!data || !mainQuestionId || !subQuestionId || !question ){
            return res.json(402).send(response(status.AUTOBIOGRAPHY_DATA_NOT_FOUND));
        }
        const result = await SaveAnswerDataService(uid,data,mainQuestionId,subQuestionId,question);
        
        if(!result){
            return res.json(403).send(response(status.AUTOBIOGRAPHY_SAVE_ERROR));
        }

        return res.send(response(status.SUCCESS));

    }catch(err){
        console.log(err);
        return res.json(500).send(response(status.INTERNAL_SERVER_ERROR));
    }
}

export async function CheckAnswerData(req,res){
    try{    
        if(!res.locals.uid){
            return res.json(409).send(response(status.EMPTY_RES_LOCALS_UID));
        }
        const uid = res.locals.uid;
        const result = await CheckAnswerDataService(uid);
        
        if(!result){
            return res.json(201).send(response(status.AUTOBIOGRAPHY_NO_DATA));
        }

        return res.send(response(status.SUCCESS));
    }catch(err){
        console.log(err);
        return res.json(500).send(response(status.INTERNAL_SERVER_ERROR));
    }
}

export async function CheckAnswerPageData(req,res){
    try{
        if(!res.locals.uid){
            return res.json(409).send(response(status.EMPTY_RES_LOCALS_UID));
        }

        const mainId = req.params.mainQuestionId;
        if(!mainId){
            return res.json(402).send(response(status.BAD_REQUEST));
        }
        const uid = res.locals.uid;

        const result = await CheckAnswerPageDataService(uid,mainId);
        if(!result){
            return res.json(201).send(response(status.BAD_REQUEST));
        }
        return res.send(response(status.SUCCESS,result));
    }catch(err){
        console.error(err);
        return res.json(500).send(response(status.INTERNAL_SERVER_ERROR));
    }
}
