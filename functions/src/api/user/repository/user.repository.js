import { db } from "../../../../config/firebase.config.js";

export async function isExistUser(uid){
    try{
        const result = (await db.collection("유저").doc(uid).get()).data();
        if(!result){
            return false;
        }
        return result.userCase;
    }catch(err){
        console.error("User/isExistUser error : ",err);
        return false;
    }
}