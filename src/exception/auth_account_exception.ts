import { UnauthorizedException } from '@nestjs/common';
import { NOT_AUTHORIZED_ACCOUNT_EXCEPTION_MSG } from "../message/message";

// 자신의 계좌가 아닌 계좌를 송금, 출금, 입금, 조회시 발생하는 예외
export class NotAuthorizedAccountException extends UnauthorizedException {
  constructor() {
    super(401, NOT_AUTHORIZED_ACCOUNT_EXCEPTION_MSG);
  }
}
