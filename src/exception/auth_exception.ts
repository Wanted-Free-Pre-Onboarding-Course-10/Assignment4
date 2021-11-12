import { UnauthorizedException } from '@nestjs/common';

// 로그인을 하지않고 송금, 입금, 출금, 조회기능을 사용하려할때 발생하는 예외
export class NotAuthorizedAccessException extends UnauthorizedException {
  constructor() {
    super(401, NOT_AUTHORIZED_EXCEPTION_MSG);
  }
}
