import { Injectable } from '@nestjs/common';
import { DepositQueryService } from '../deposit/deposit.query.service';
import { WithdrawQueryService } from '../withdraw/withdraw.query.service';

@Injectable()
export class AccountQueryService {
  constructor(
    private depositQueryService: DepositQueryService,
    private withdrawQueryService: WithdrawQueryService,
  ) {}

  async getTransactionHistory() {
    const deposit = await this.depositQueryService.getTransactionHistory();
    const withdraw = await this.withdrawQueryService.getTransactionHistory();
    return [...deposit, ...withdraw];
  }
}
