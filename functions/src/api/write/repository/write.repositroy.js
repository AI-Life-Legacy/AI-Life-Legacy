import { db } from "../../../../config/firebase.config.js";

export async function GetWriteDataRepository(uid,mainId,subId){
    try{
        const mainCollectionRef = await db.collection('답변').doc(uid).collection(mainId.toString()).doc(subId.toString()).get();
        const result = mainCollectionRef.data();
        if(!result){
            return false;
        }
        return result;
    }catch(err){
        console.error("write/GetWriteDataRepository error: ",err);
        return false;
    }

}

export async function SaveWriteDataRepository(uid,mainId,subId,data){
    try{
        const result = await db.collection('답변').doc(uid).collection(mainId.toString()).doc(subId.toString()).update({
            answer:data,
        });
        if(!result){
            return false;
        }
        return true;
    }catch(err){
        console.error("write/SaveWriteDataRepository error: ",err);
        return false;
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

export async function SaveAnswerDataRepository(uid, data, mainQuestionId,subQuestionId,question){
    try{
        const result = await db.collection("답변").doc(uid).collection(mainQuestionId.toString()).doc(subQuestionId.toString()).set({
            answer: data,
            question,
        });
        if(!result){
            return false;
        }
        return true;
    }catch(err){
        console.error("write/SaveAnswerDataRepository error: ",err);
        return false;
    }
}

export async function CheckAnswerDataRepository(uid){
    try{
        const isExist = await db.collection("답변").doc(uid).collection("1").doc("1").get();
        const result = isExist.exists
        return result;
    }catch(err){
        console.error(err);
        return false;
    }
}
export async function CheckAnswerPageDataRepository(uid,mainId){
    try{
        const isExist = await db.collection("답변").doc(uid).collection(mainId.toString()).doc(i.toString()).get();
        const result = isExist.exists
        return result;
    }catch(err){
        console.error("write/CheckAnswerPageDataRepository error: ",err);
        return false;
    }
}