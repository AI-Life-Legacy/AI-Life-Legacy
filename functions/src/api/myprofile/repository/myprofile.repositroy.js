import { db } from "../../../../config/firebase.config.js";
export async function SaveMainQuestionRepository(uid,data,caseNum){
    try{
        await db.collection("대질문").doc(uid).set({
            data
        });
        await db.collection("유저").doc(uid).update({
            userCase: caseNum
        });
        return true;
    }catch(err){
        console.error("myprofile/SaveMainQuestionRepository error: ",err);
        return false;
    }
}

export async function GetMainQuestionRepository(caseNum) {
    try {
        const data =(await db.collection("대질문").doc(caseNum).get()).data();
        if(!data){
            return false;
        }
        return data;
    } catch (err) {
        console.error("myprofile/GetMainQuestionRepository error: ",err);
        return false;
    }
}

export async function GetUserMainQuestionRepository(uid) {
    try {
        const data =(await db.collection("대질문").doc(uid).get()).data();
        if(!data){
            return false;
        }
        return data;
    } catch (err) {
        console.error("myprofile/GetUserMainQuestionRepository error:",err);
        return false;
    }
}