import { db } from "../../../../config/firebase.config.js";

export class PostsRepository {
     async savePostData(uid, saveDataDTO) {
        try {
            await db.collection("답변").doc(uid).collection(saveDataDTO.mainQuestionId.toString()).doc(saveDataDTO.subQuestionId.toString()).set({
                answer: saveDataDTO.data,
                question: saveDataDTO.question,
            });
        } catch (err) {
            console.error("posts/savePostDataRepository error: ", err);
            throw err;
        }
    }
    
     async checkPostData(uid) {
        try {
            return await db.collection("답변").doc(uid).collection("1").doc("1").get();
        } catch (err) {
            console.error("posts/checkPostDataRepository error: ", err);
            throw err;
        }
    }
    
     async getPostData(uid, getPostDataDTO) {
        try {
            const mainCollectionRef = await db.collection('답변').doc(uid).collection(getPostDataDTO.mainId.toString()).doc(getPostDataDTO.subId.toString()).get();
            return mainCollectionRef.data();
        } catch (err) {
            console.error("posts/getPostDataRepository error: ", err);
            throw err;
        }
    }
    
     async updatePostData(uid, updatePostDataDTO) {
        try {
            await db.collection('답변').doc(uid).collection(updatePostDataDTO.mainId.toString()).doc(updatePostDataDTO.subId.toString()).update({
                answer: updatePostDataDTO.data,
            });
        } catch (err) {
            console.error("posts/updatePostDataRepository error: ", err);
            throw err;
        }
    }
    
     async checkPostPageData(uid, checkPostDataDTO) {
        try {
            return await db.collection("답변").doc(uid).collection(checkPostDataDTO.mainId.toString()).doc('5').get();
        } catch (err) {
            console.error("posts/checkPostPageDataRepository error: ", err);
            throw err;
        }
    }
    
     async checkWrittenPages(uid) {
        try {
            for (let i = 1; i < 11; i++) {
                const isExist = await db.collection("답변").doc(uid).collection(i.toString()).doc('5').get();
                if (!isExist.exists) {
                    return i; // 작성되지 않은 페이지 반환
                }
            }
            return null; // 모든 문서가 존재할 경우 null 반환
        } catch (err) {
            console.error("posts/checkWrittenPagesRepository error: ", err);
            throw err;
        }
    }    
}
