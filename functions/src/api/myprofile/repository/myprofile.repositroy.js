import { db } from "../../../../config/firebase.config.js";

export async function GetUserMainQuestionRepository(uid) {
    try {
        return (await db.collection("대질문").doc(uid).get()).data();
    } catch (err) {
        console.error("myprofile/GetUserMainQuestionRepository error:",err);
        throw err;
    }
}

export async function SaveMainQuestionRepository(uid,data,caseNum){
    try{
        await db.collection("대질문").doc(uid).set({
            data
        });
        await db.collection("유저").doc(uid).update({
            userCase: caseNum
        });
    }catch(err){
        console.error("myprofile/SaveMainQuestionRepository error: ",err);
        throw err;
    }
}

export async function GetMainQuestionRepository(caseNum) {
    try {
        return (await db.collection("대질문").doc(caseNum).get()).data() ?? null;
    } catch (err) {
        console.error("myprofile/GetMainQuestionRepository error: ",err);
        throw err;
    }
}