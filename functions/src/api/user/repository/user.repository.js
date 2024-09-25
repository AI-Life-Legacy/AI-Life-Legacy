import { db } from "../../../../config/firebase.config.js";

export class UserRepository {
    async getUserCase(uid) {
        try {
            const userDoc = await db.collection("유저").doc(uid).get();
            return userDoc.data();
        } catch (err) {
            console.error("User/getUserCase R error: ", err);
            throw err; // 예외를 상위로 던짐 (Service로)
        }
    }
}