import { UserRepository } from "../repository/user.repository.js";
import { GetUserCaseReponse } from "../dto/user.dto.js";

export class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async getUserCase(uid) {
    try {
        const userCase = await this.userRepository.getUserCase(uid);
        if (!userCase) {
            throw new Error('USER_NOT_FOUND'); // 사용자 존재하지 않음 예외
        }
        return new GetUserCaseReponse(userCase);
    } catch (err) {
        console.error("User/getUserCase S error: ", err);
        throw err; // 예외를 상위로 던짐 (Controller로)
    }
  }
}