import { BadRequestException } from '@nestjs/common';

// 잔액보다 많은 금액을 춣금이나 송금하려할시 발생하는 예외
export class NotEnoughBalanceException extends BadRequestException {
  constructor() {
    super(400, NOT_ENOUGH_BALANCE_EXCEPTION_MSG);
  }
}
