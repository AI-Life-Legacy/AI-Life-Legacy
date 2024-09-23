import { db } from "../../../../config/firebase.config.js";

export async function isExistUser(uid) {
    try {
        const userDoc = await db.collection("유저").doc(uid).get();
        const userData = userDoc.data();
        return userData ? userData.userCase : null; // 존재하지 않으면 null 반환
    } catch (err) {
        console.error("User/isExistUser error: ", err);
        throw err; // 예외를 상위로 던짐 (Service로)
    }
}