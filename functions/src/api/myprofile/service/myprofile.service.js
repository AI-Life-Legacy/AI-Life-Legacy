import { GetMainQuestionRepository, GetUserMainQuestionRepository, SaveMainQuestionRepository } from "../repository/myprofile.repositroy.js";

export async function SaveMainQuestionService(uid,data,caseNum) {
    try {
        return await SaveMainQuestionRepository(uid,data,caseNum);
    } catch (err) {
        console.error(err);
        return false;
    }
}
export async function GetMainQuestionService(caseNum) {
    try {
        return await GetMainQuestionRepository(caseNum);
    } catch (err) {
        console.error(err);
        return false;
    }
}
export async function GetUserMainQuestionService(uid) {
    try {
        return await GetUserMainQuestionRepository(uid);
    } catch (err) {
        console.error(err);
        return false;
    }
}