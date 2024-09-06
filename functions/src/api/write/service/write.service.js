import { CheckAnswerDataRepository, CheckAnswerPageDataRepository, CheckPageDataRepository, GetWriteDataRepository, PatchWriteDataRepository, SaveAnswerDataRepository  } from "../repository/write.repositroy.js";

export async function GetWriteDataService(uid,mainId,subId) {
    try {
        return await GetWriteDataRepository(uid,mainId,subId);
    } catch (err) {
        console.error(err);
        return false;
    }    
}

export async function PatchWriteDataService(uid,mainId,subId,data) {
    try {
        return await PatchWriteDataRepository(uid,mainId,subId,data);
    } catch (err) {
        console.error(err);
        return false;
    }    
}

export async function SaveAnswerDataService(uid, data, mainQuestionId,subQuestionId,question) {
    try {
        return await SaveAnswerDataRepository(uid, data, mainQuestionId,subQuestionId,question);
    } catch (err) {
        console.error(err);
        return false;
    }
}

export async function CheckAnswerDataService(uid) {
    try {
        return await CheckAnswerDataRepository(uid);
    } catch (err) {
        console.error(err);
        return false;
    }
}

export async function CheckAnswerPageDataService(uid,mainId) {
    try{
        return await CheckAnswerPageDataRepository(uid,mainId)     
    }catch(err){
        console.error(err);
        return false;
    }
}

export async function CheckPageDataService(uid) {
    try{
        return await CheckPageDataRepository(uid)     
    }catch(err){
        console.error(err);
        return false;
    }
}