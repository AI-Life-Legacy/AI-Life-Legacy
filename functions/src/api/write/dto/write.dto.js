export class SaveDataDTO {
    constructor ({data,mainQuestionId,subQuestionId,question}){
        this.data = data;
        this.mainQuestionId = mainQuestionId;
        this.subQuestionId = subQuestionId;
        this.question = question;
    }
}

export class GetWriteDataDTO {
    constructor ({ mainId, subId}){
        this.mainId = mainId;
        this.subId = subId;
    }
}

export class PatchWriteDataDTO {
    constructor ({ mainId, subId, data}){
        this.mainId = mainId;
        this.subId = subId;
        this.data = data;
    }
}

export class CheckAnswerPageDTO {
    constructor ({ mainQuestionId }){
        this.mainQuestionId = mainQuestionId;
    }
}