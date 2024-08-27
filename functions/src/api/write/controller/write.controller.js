import { response } from "../../../utils/response/response.js";
import { status } from "../../../utils/response/response.status.js";
import { CheckAnswerPageDataService, SaveAnswerDataService, CheckAnswerDataService, GetWriteDataService, SaveWriteDataService} from "../service/write.service.js";

export async function GetWriteData(req,res){
    try{
        if(!res.locals.uid){
            return res.send(response(status.NOT_LOGIN_ERROR));
        }
        const uid = res.locals.uid;

        const {mainId,subId} = req.params;
        if(!mainId,!subId){
            return res.send(response(status.EMPTY_REQUEST_BODY));
        }
        console.log(mainId,subId);

        const result = await GetWriteDataService(uid,mainId,subId);
        
        if(!result){
            return res.send(response(status.AUTOBIOGRAPHY_SAVE_ERROR));
        }
        console.log(result)
        return res.send(response(status.SUCCESS,result));

    }catch(err){
        console.log(err);
        return res.send(response(status.INTERNAL_SERVER_ERROR));
    }
}

export async function SaveWriteData(req,res){
    try{
        if(!res.locals.uid){
            return res.send(response(status.NOT_LOGIN_ERROR));
        }
        const uid = res.locals.uid;

        const {mainId,subId,data} = req.body;

        if(!mainId,!subId,!data){
            return res.send(response(status.EMPTY_REQUEST_BODY));
        }
        console.log(mainId,subId);

        const result = await SaveWriteDataService(uid,mainId,subId,data);
        
        if(!result){
            return res.send(response(status.AUTOBIOGRAPHY_SAVE_ERROR));
        }

        return res.send(response(status.SUCCESS));

    }catch(err){
        console.log(err);
        return res.send(response(status.INTERNAL_SERVER_ERROR));
    }
}

export async function SaveAnswerData(req,res){
    try{
        if(!res.locals.uid){
            return res.send(response(status.NOT_LOGIN_ERROR));
        }
        const uid = res.locals.uid;
        const {data,mainQuestionId,subQuestionId,question} = req.body;

        if(!data || !uid ){
            return res.send(response(status.AUTOBIOGRAPHY_DATA_NOT_FOUND));
        }
        const result = await SaveAnswerDataService(uid,data,mainQuestionId,subQuestionId,question);
        
        if(!result){
            return res.send(response(status.AUTOBIOGRAPHY_SAVE_ERROR));
        }

        return res.send(response(status.SUCCESS));

    }catch(err){
        console.log(err);
        return res.send(response(status.INTERNAL_SERVER_ERROR));
    }
}

export async function CheckAnswerData(req,res){
    try{    
        if(!res.locals.uid){
            return res.send(response(status.NOT_LOGIN_ERROR));
        }
        const uid = res.locals.uid;
        const result = await CheckAnswerDataService(uid);
        
        if(!result){
            return res.send(response(status.AUTOBIOGRAPHY_NO_DATA));
        }

        return res.send(response(status.SUCCESS));
    }catch(err){
        console.log(err);
        return res.send(response(status.INTERNAL_SERVER_ERROR));
    }
}

export async function CheckAnswerPageData(req,res){
    const mainId = req.params.mainQuestionId;
    try{
        if(!mainId){
            return res.send(response(status.BAD_REQUEST));
        }
        if(!res.locals.uid){
            return res.send(response(status.NOT_LOGIN_ERROR));
        }
        const uid = res.locals.uid;

        const result = await CheckAnswerPageDataService(uid,mainId);
        if(!result){
            return res.send(response(status.BAD_REQUEST));
        }

        return res.send(response(status.SUCCESS,result));
    }catch(err){
        console.error(err);
        return res.send(response(status.INTERNAL_SERVER_ERROR));
    }
}
