import { CheckAnswerDataRepository, CheckAnswerPageDataRepository, CheckPageDataRepository, GetWriteDataRepository, PatchWriteDataRepository, SaveAnswerDataRepository  } from "../repository/write.repositroy.js";

export async function SaveAnswerDataService(uid, saveDataDTO) {
    try {
        await SaveAnswerDataRepository(uid, saveDataDTO);
    } catch (err) {
        console.error(err);
        throw new Error('SAVE_DATA_ERR');
    }
}

export async function CheckAnswerDataService(uid) {
    try {
        const result = await CheckAnswerDataRepository(uid);
        if(!result.exists){
            throw new Error('GET_DATA_ERR');
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export async function GetWriteDataService(uid,getWriteDataDTO) {
    try {

        const result = await GetWriteDataRepository(uid,getWriteDataDTO);
        if(!result){
            throw new Error('DATA_NOT_FOUND');
        }
        return result;
    } catch (err) {
        console.error(err);
        return false;
    }    
}

export async function PatchWriteDataService(uid,patchWriteDataDTO) {
    try {
        await PatchWriteDataRepository(uid,patchWriteDataDTO);
    } catch (err) {
        console.error(err);
        throw new Error('PATCH_DATA_ERR');
    }    
}

export async function CheckAnswerPageDataService(uid,checkAnswerDataDTO) {
    try{
        const result = await CheckAnswerPageDataRepository(uid,checkAnswerDataDTO);
        if(!result.exists){
            throw new Error('DATA_NOT_FOUND');
        }     
    }catch(err){
        console.error(err);
        return false;
    }
}

export async function CheckPageDataService(uid) {
    try{
        const result = await CheckPageDataRepository(uid);
        if (result === null) {
            throw new Error('DATA_NOT_FOUND'); // 데이터를 찾지 못한 경우 에러 처리
        }
        return result;
    }catch(err){
        console.error(err);
        throw err;
    }
}