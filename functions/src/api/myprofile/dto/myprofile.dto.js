export class SaveMainQuestionDTO {
    constructor ({ data, caseNum }){
        this.data = data;
        this.caseNum = caseNum;
    }
}

export class GetMainQuestionDTO {
    constructor ({ caseNum }){
        this.caseNum = caseNum;
    }
}

export class GetMainQuestionResposne {
    constructor (caseNum){
        this.caseNum = caseNum;
    }
}