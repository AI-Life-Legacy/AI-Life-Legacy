import { response } from "../../../utils/response/response.js";
import { status } from "../../../utils/response/response.status.js";
import { CombineService, MakeCaseService, MakeReQuestionDataService } from '../service/chatgpt.service.js';

export async function MakeCase(req, res) {
    try {
        if(!res.locals.uid){
            return res.send(response(status.NOT_LOGIN_ERROR));
        }
        let { data } = req.body;
        let prompt = `
        사용자의 답변을 통해 케이스를 분류합니다.
        사용자 데이터: ${data}
        케이스 분류 기준:
        case_1: 대학교를 다님, 결혼을 함, 자녀가 있음
        case_2: 대학교를 다님, 결혼을 함, 자녀가 없음
        case_3: 대학교를 다님, 결혼을 하지 않음, 자녀가 없음
        case_4: 대학교를 다니지 않음, 결혼을 함, 자녀가 있음
        case_5: 대학교를 다니지 않음, 결혼을 함, 자녀가 없음
        case_6: 대학교를 다니지 않음, 결혼을 하지 않음, 자녀가 없음

        결혼 상태는 '기혼' 또는 '미혼'으로 구분합니다.
        대학교 여부는 대학을 다닌 경우로 간주합니다.

        일치하는 case 번호를 'case_번호' 형태로만 응답하세요. 예를 들어, case_1이라면 'case_1'로 응답하세요. 따옴표나 추가적인 설명은 포함하지 마세요.
        `;

        if (!data) {
            return res.send(response(status.CHATGPT_DATA_NOT_FOUND));
        }

        prompt += data;

        const result = await MakeCaseService(prompt);

        console.log(result);

        if(!result){
            return res.send(response(status.CHATGPT_GET_QUERY_ERROR));
        }
        return res.send(response(status.SUCCESS, result));
    } catch (err) {
        console.error('Error in GetData:', err);
        return res.send(response(status.INTERNAL_SERVER_ERROR));
    }
}

export async function MakeReQuestionData(req, res) {
    try {
        if(!res.locals.uid){
            return res.send(response(status.NOT_LOGIN_ERROR));
        }
        let { question ,data } = req.body;

        let prompt = `
        나는 자서전을 쓰고 있어. ${question} 질문에 대해 ${data}라고 대답했어.
        이 대답을 바탕으로 더 깊이 있는 이야기를 끌어낼 수 있는 구체적이고 흥미로운 2차 질문을 하나 만들어줘.
        질문은 개인적인 경험을 더 상세하게 묻거나, 특정한 감정이나 기억을 이끌어낼 수 있는 것이어야 해. 상황에 맞게 너가 구체적이고 흥미로운 2차 질문을 하나 만들어줘.
        결과물에는 따옴표나 추가 설명 없이 오직 질문만 작성해줘.
        `;

        if (!data) {
            return res.send(response(status.CHATGPT_DATA_NOT_FOUND));
        }
        const result = await MakeReQuestionDataService(prompt);

        if(!result){
            return res.send(response(status.CHATGPT_GET_QUERY_ERROR));
        }
        console.log(result);

        return res.send(response(status.SUCCESS, result));
    } catch (err) {
        console.error('Error in GetData:', err);
        return res.send(response(status.INTERNAL_SERVER_ERROR));
    }
}
export async function Combine(req, res) {
    try {
        if(!res.locals.uid){
            return res.send(response(status.NOT_LOGIN_ERROR));
        }
        let { question1,question2,data1,data2 } = req.body;

        let prompt = `
        나는 현재 자서전을 작성하고 있습니다. 사용자로부터 두 개의 질문에 대한 답변을 받았습니다. 첫 번째 질문은 "${question1}"이고, 답변은 "${data1}"이야. 두번째 질문은 "${question2}"이고, 답변은 "${data2}"이야.
        해당 질문과 답변을 토대로 다음 예시를 참고해서 따옴표나 사족 없이, 최종 수정된 문장을 나한테 줘.
        ***
        예시질문:용준님은 언제 어디서 태어나셨나요? 탄생에 얽힌 이야기가 있나요? 부모님이나 가족들이 당신의 유아기에 대해 어떤 이야기를 해주셨나요?
        
        사용자답변:
        나는 1985년 4월 15일 전남 순천에서 태어났어. 태몽은 어머니가 꽃잎 꿈을 꾸셨대. 어릴때는 몸이 좀 허약했으나 성격은 밝았어. 나는 어릴적부터 책을 매우 좋아했지. 어릴 때 첫 마디가 "책"이어서 부모님이 완전 놀라셨어.
        
        너가 작성해줘야 하는 스타일의 답변:
        봄의 향기가 가득했던 1985년 4월 15일, 나는 전라남도 순천의 작은 병원에서 세상의 빛을 보았다. 어머니는 내가 태어나기 전날 밤, 꽃잎이 흩날리는 아름다운 꿈을 꾸셨다고 한다. 그 꿈이 나의 탄생을 예고했던 걸까.
        어릴 적 나는 몸이 약해 자주 아팠지만, 늘 웃음을 잃지 않았다고 한다. 그 시절 내 얼굴에 띤 미소를 부모님은 아직도 생생히 기억하신다.
        책은 내 어린 시절의 가장 친한 친구였다. 그림책을 펼치면 시간 가는 줄 모르고 빠져들었던 기억이 난다. 3살 때 처음 내뱉은 말이 "책"이었다는 건 내 인생의 방향을 예견한 듯하다. 그 순간 부모님의 놀란 표정이 아직도 눈에 선하다.
        이렇게 책과 함께 시작된 나의 이야기는 지금도 계속되고 있다. 그때부터 지금까지, 나는 여전히 책의 세계에 푹 빠져 있다.
        `

        if (!question1 || !question2 || !data1 || !data2) {
            return res.send(response(status.CHATGPT_DATA_NOT_FOUND));
        }
        const result = await CombineService(prompt);

        if(!result){
            return res.send(response(status.CHATGPT_GET_QUERY_ERROR));
        }
        console.log(result);

        return res.send(response(status.SUCCESS, result));
    } catch (err) {
        console.error('Error in GetData:', err);
        return res.send(response(status.INTERNAL_SERVER_ERROR));
    }
}
