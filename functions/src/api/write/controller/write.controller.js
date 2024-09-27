import { response } from "../../../utils/response/response.js";
import { status } from "../../../utils/response/response.status.js";
import { checkAnswerPageSchema, getWriteDataSchema, patchWriteDataSchema, saveDataSchema } from "../../../vaild/write.vaild.js";
import { CheckAnswerPageDTO, GetWriteDataDTO, PatchWriteDataDTO, SaveDataDTO } from "../dto/write.dto.js";
import { CheckAnswerPageDataService, SaveAnswerDataService, CheckAnswerDataService, GetWriteDataService, PatchWriteDataService, CheckPageDataService} from "../service/write.service.js";

export async function SaveAnswerData(req,res){
    try{
        if (!checkUidInLocals(res)) {
            return res.status(409).json(response(status.EMPTY_RES_LOCALS_UID));
        }

        const {error, value} = saveDataSchema.validate(req.body);
        if(error){
            const errorMessages = error.details.map(detail => detail.message);
            return res.status(400).json(response(status.AUTOBIOGRAPHY_DATA_NOT_FOUND,errorMessages));
        }

        const saveDataDTO = new SaveDataDTO(value);
        await SaveAnswerDataService(res.locals.uid,saveDataDTO);

        return res.json(response(status.SUCCESS));
    }catch(err){
        if(err.message == 'SAVE_DATA_ERR'){
            return res.status(500).json(response(status.AUTOBIOGRAPHY_SAVE_ERROR));
        }
        console.log(err);
        return res.status(500).json(response(status.INTERNAL_SERVER_ERROR));
    }
}

export async function CheckAnswerData(req,res){
    try{    
        if (!checkUidInLocals(res)) {
            return res.status(409).json(response(status.EMPTY_RES_LOCALS_UID));
        }

        await CheckAnswerDataService(res.locals.uid);

        return res.json(response(status.SUCCESS));
    }catch(err){
        if(err.message == 'GET_DATA_ERR'){
            return res.status(404).json(response(status.AUTOBIOGRAPHY_NO_DATA));
        }
        console.log(err);
        return res.status(500).json(response(status.INTERNAL_SERVER_ERROR));
    }
}

export async function GetWriteData(req,res){
    try{
        if (!checkUidInLocals(res)) {
            return res.status(409).json(response(status.EMPTY_RES_LOCALS_UID));
        }

        const {error,value} = getWriteDataSchema.validate(req.params);
        if(error){
            const errorMessages = error.details.map(detail => detail.message);
            return res.status(400).json(response(status.AUTOBIOGRAPHY_EMPTY_QUERY_DATA,errorMessages));
        }

        const getWriteDataDTO = new GetWriteDataDTO(value);
        const result = await GetWriteDataService(res.locals.uid,getWriteDataDTO);
        
        return res.json(response(status.SUCCESS,result));
    }catch(err){
        if(err.message == 'DATA_NOT_FOUND'){
            return res.status(404).json(response(status.AUTOBIOGRAPHY_DATA_NOT_FOUND));
        }
        console.log(err);
        return res.status(500).json(response(status.INTERNAL_SERVER_ERROR));
    }
}

export async function PatchWriteData(req,res){
    try{
        if (!checkUidInLocals(res)) {
            return res.status(409).json(response(status.EMPTY_RES_LOCALS_UID));
        }

        const {error,value} = patchWriteDataSchema.validate(req.body);
        if(error){
            const errorMessages = error.details.map(detail => detail.message);
            return res.status(400).json(response(status.EMPTY_REQUEST_BODY,errorMessages));
        }

        const patchWriteDataDTO = new PatchWriteDataDTO(value);
        await PatchWriteDataService(res.locals.uid,patchWriteDataDTO);

        return res.json(response(status.SUCCESS));
    }catch(err){
        if(err.message == 'PATCH_DATA_ERR'){
            return res.status(404).json(response(status.AUTOBIOGRAPHY_PATCH_ERROR));
        }
        console.log(err);
        return res.status(500).json(response(status.INTERNAL_SERVER_ERROR));
    }
}

export async function CheckAnswerPageData(req,res){
    try{
        if (!checkUidInLocals(res)) {
            return res.status(409).json(response(status.EMPTY_RES_LOCALS_UID));
        }

        const {error,value} = checkAnswerPageSchema.validate(req.params);
        if(error){
            const errorMessages = error.details.map(detail => detail.message);
            return res.status(400).json(response(status.AUTOBIOGRAPHY_EMPTY_REQUEST_DATA),errorMessages);
        }

        const checkAnswerPageDTO = new CheckAnswerPageDTO(value);

        await CheckAnswerPageDataService(res.locals.uid,checkAnswerPageDTO);

        return res.json(response(status.SUCCESS));
    }catch(err){
        if(err.message == 'DATA_NOT_FOUND'){
            return res.status(404).json(response(status.AUTOBIOGRAPHY_DATA_NOT_FOUND));
        }
        console.error(err);
        return res.status(500).json(response(status.INTERNAL_SERVER_ERROR));
    }
}

export async function CheckPageData(req,res){
    try{    
        if (!checkUidInLocals(res)) {
            return res.status(409).json(response(status.EMPTY_RES_LOCALS_UID));
        }

        const result = await CheckPageDataService(res.locals.uid);

        return res.json(response(status.SUCCESS,result));
    }catch(err){
        if (err.message === 'DATA_NOT_FOUND') {
            return res.status(404).json(response(status.AUTOBIOGRAPHY_DATA_NOT_FOUND));
        }
        console.log(err);
        return res.status(500).json(response(status.INTERNAL_SERVER_ERROR));
    }
}