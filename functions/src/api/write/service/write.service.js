import { CheckAnswerDataRepository, CheckAnswerPageDataRepository, GetWriteDataRepository, SaveAnswerDataRepository, SaveWriteDataRepository } from "../repository/write.repositroy.js";

export async function GetWriteDataService(uid,mainId,subId) {
    try {
        return await GetWriteDataRepository(uid,mainId,subId);
    } catch (err) {
        console.error(err);
        return false;
    }    
}

export async function SaveWriteDataService(uid,mainId,subId,data) {
    try {
        return await SaveWriteDataRepository(uid,mainId,subId,data);
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
        let count=0;
        for (let i = 1; i <= 5; i++) {
            const result = await CheckAnswerPageDataRepository(uid,mainId)
            if(result){
                count++;
            }
        }
        if(count > 4){
            return "true";
        }else{
            return "false";
        }
    }catch(err){
        console.error(err);
        return false;
    }
}