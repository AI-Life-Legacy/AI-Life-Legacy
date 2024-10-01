import { response } from "../../../utils/response/response.js";
import { status } from "../../../utils/response/response.status.js";
import { checkUidInLocals } from "../../../utils/validators/logincheck.js";
import { UserService } from "../service/user.service.js";

const userService = new UserService();

export const GetCase = async (req, res) => {
  try {
    // UID 검증 함수 호출
    if (!checkUidInLocals(res)) {
      return res.status(409).json(response(status.EMPTY_RES_LOCALS_UID));
    }

    // 유저 케이스 가져오기
    const result = await userService.getUserCase(res.locals.uid);
    
    // 성공 응답
    return res.status(200).json(response(status.SUCCESS, result.userCase));
  } catch (err) {
    // 예외 처리
    if (err.message === 'USER_NOT_FOUND') {
      return res.status(402).json(response(status.USER_GETCASE_ERROR));
    }
    console.error('User/GetCase error: ', err);
    return res.status(500).json(response(status.INTERNAL_SERVER_ERROR));
  }
};
