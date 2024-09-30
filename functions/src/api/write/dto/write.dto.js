export class SaveWriteDataDTO {
    constructor({ data, question, mainQuestionId, subQuestionId}){
        this.data = data;
        this.question = question;
        this.mainQuestionId = mainQuestionId;
        this.subQuestionId = subQuestionId;
    }
}

export class GetWriteDataDTO {
    constructor({ mainId, subId }){
        this.mainId = mainId;
        this.subId = subId;
    }
}

export class PatchWriteDataDTO {
    constructor ({ data,mainId,subId }){
        this.data = data;
        this.mainId = mainId;
        this.subId = subId;
    }
}

export class CheckAnswerDataDTO {
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