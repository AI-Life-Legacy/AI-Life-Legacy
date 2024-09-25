import { CheckAnswerDataRepository, CheckAnswerPageDataRepository, CheckPageDataRepository, GetWriteDataRepository, PatchWriteDataRepository, SaveAnswerDataRepository  } from "../repository/write.repositroy.js";

export async function SaveAnswerDataService(uid, writeData) {
    try {
        await SaveAnswerDataRepository(uid, writeData);
    } catch (err) {
        console.error(err);
        throw new Error('SAVE_DATA_ERR');
    }
}

export async function CheckAnswerDataService(uid) {
    try {
        await CheckAnswerDataRepository(uid);
    } catch (err) {
        if(err.message == 'GET_DATA_ERR'){
            throw new Error('GET_DATA_ERR');
        }
        console.error(err);
        throw err;
    }
}

export async function GetWriteDataService(uid,questionIdData) {
    try {
        return await GetWriteDataRepository(uid,questionIdData);
    } catch (err) {
        if(err.message == 'DATA_NOT_FOUND'){
            throw new Error('DATA_NOT_FOUND');
        }
        console.error(err);
        return false;
    }    
}

export async function PatchWriteDataService(uid,patchData) {
    try {
        await PatchWriteDataRepository(uid,patchData);
    } catch (err) {
        console.error(err);
        throw new Error('PATCH_DATA_ERR');
    }    
}

export async function CheckAnswerPageDataService(uid,mainId) {
    try{
        await CheckAnswerPageDataRepository(uid,mainId)     
    }catch(err){
        if(err.message == 'DATA_NOT_FOUND'){
            throw new Error('DATA_NOT_FOUND');
        }
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