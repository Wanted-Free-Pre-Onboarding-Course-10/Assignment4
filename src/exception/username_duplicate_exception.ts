import { BadRequestException } from '@nestjs/common';
import { DUPLICATE_USERNAME_EXCEPTION_MSG } from "../message/message";

// 중복된 username으로 회원가입하려 할시 발생하는 예외
export class UserNameDuplicateException extends BadRequestException {
  constructor() {
    super(400, DUPLICATE_USERNAME_EXCEPTION_MSG);
  }
}
