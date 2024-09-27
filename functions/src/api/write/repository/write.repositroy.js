import { db } from "../../../../config/firebase.config.js";

export async function SaveAnswerDataRepository(uid, saveDataDTO){
    try{
        await db.collection("답변").doc(uid).collection(saveDataDTO.mainQuestionId.toString()).doc(saveDataDTO.subQuestionId.toString()).set({
            answer: saveDataDTO.data,
            question: saveDataDTO.question,
        });
    }catch(err){
        console.error("write/SaveAnswerDataRepository error: ",err);
        throw err;
    }
}

export async function CheckAnswerDataRepository(uid){
    try{
        const isExist = await db.collection("답변").doc(uid).collection("1").doc("1").get();
        if(!isExist.exists){
            throw new Error('GET_DATA_ERR');
        }
    }catch(err){
        console.error("write/CheckAnswerDataRepository error: ",err);
        throw err;
    }
}

export async function GetWriteDataRepository(uid,getWriteDataDTO){
    try{
        const mainCollectionRef = await db.collection('답변').doc(uid).collection(getWriteDataDTO.mainId.toString()).doc(getWriteDataDTO.subId.toString()).get();
        const result = mainCollectionRef.data();
        if(!result){
            throw new Error('DATA_NOT_FOUND');
        }
        return result;
    }catch(err){
        console.error("write/GetWriteDataRepository error: ",err);
        throw err;
    }

}

export async function PatchWriteDataRepository(uid,patchWriteDataDTO){
    try{
        await db.collection('답변').doc(uid).collection(patchWriteDataDTO.mainId.toString()).doc(patchWriteDataDTO.subId.toString()).update({
            answer:patchWriteDataDTO.data,
        });
    }catch(err){
        console.error("write/PatchWriteDataRepository error: ",err);
        throw err;
    }

}

export async function GetAnswerDataRepository(uid,mainQuestionId){
    try{
        const mainCollectionRef = db.collection('답변').doc(uid).collection(mainQuestionId.toString());
        const result = await mainCollectionRef.get();
        if(!result){
            return false;
        }
        return result;
    }catch(err){
        console.error("write/GetAnswerData error: ",err);
        return false;
    }

}

export async function CheckAnswerPageDataRepository(uid,checkAnswerPageDTO){
    try{
        const isExist = await db.collection("답변").doc(uid).collection(checkAnswerPageDTO.mainQuestionId.toString()).doc('5').get();
        if(!isExist.exists){
            throw new Error('DATA_NOT_FOUND');
        }
    }catch(err){
        console.error("write/CheckAnswerPageDataRepository error: ",err);
        throw err;
    }
}

export async function CheckPageDataRepository(uid){
    try{
        for (let i = 1; i < 11; i++) {
            const isExist = await db.collection("답변").doc(uid).collection(i.toString()).doc('5').get();
            if (!isExist.exists) {
                return i; // 결과값을 바로 반환
            }
        }
        return null; // 모든 문서가 존재할 경우 null 반환
    }catch(err){
        console.error("write/CheckPageDataRepository error: ",err);
        throw err;
    }
}