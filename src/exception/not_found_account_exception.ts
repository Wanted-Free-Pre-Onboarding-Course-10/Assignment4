import { NotFoundException } from '@nestjs/common';
import { NOT_FOUND_ACCOUNT_EXCEPTION_MSG } from "../message/message";

// 없는 계좌를 조회하려 할떄 발생하는 예외
export class AccountNotFoundException extends NotFoundException {
  constructor(account: string) {
    super(404, account + "는 " + NOT_FOUND_ACCOUNT_EXCEPTION_MSG);
  }
}
