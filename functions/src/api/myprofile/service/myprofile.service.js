import { GetMainQuestionRepository, GetUserMainQuestionRepository, SaveMainQuestionRepository } from "../repository/myprofile.repositroy.js";

export async function GetUserMainQuestionService(uid) {
    try {
        const result = await GetUserMainQuestionRepository(uid);
        if(!result){
            throw new Error('DATA_NOT_FOUND');
        }
    } catch (err) {
        console.error("myprofile/GetUserMainQuestionService error: ",err);
        throw err;
    }
}

export async function SaveMainQuestionService(uid,data,caseNum) {
    try {
        return await SaveMainQuestionRepository(uid,data,caseNum);
    } catch (err) {
        console.error("myprofile/SaveMainQuestionRespository error: ",err);
        throw err;
    }
}

export async function GetMainQuestionService(caseNum) {
    try {
        const result = await GetMainQuestionRepository(caseNum);
        if(!result){
            throw new Error('DATA_NOT_FOUND');
        }
        return result;
    } catch (err) {
        console.error("myprofile/GetMainQuestionService error: ",err);
        throw err;
    }
}