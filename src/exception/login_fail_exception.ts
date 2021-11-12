import { UnauthorizedException } from '@nestjs/common';

// 로그인 실패 예외
export class LoginFailException extends UnauthorizedException {
  constructor() {
    super(401, LOGIN_FAIL_EXCEPTION_MSG);
  }
}
