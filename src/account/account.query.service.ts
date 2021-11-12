import { Injectable } from '@nestjs/common';
import { DepositQueryService } from '../deposit/deposit.query.service';
import { WithdrawQueryService } from '../withdraw/withdraw.query.service';
import { TransactionHistory } from './graph.transaction.history.entity';

@Injectable()
export class AccountQueryService {
  constructor(
    private depositQueryService: DepositQueryService,
    private withdrawQueryService: WithdrawQueryService,
  ) {}

  async getTransactionHistory() {
    const deposits = await this.depositQueryService.getTransactionHistory();
    const withdraws = await this.withdrawQueryService.getTransactionHistory();
    return [
      ...deposits.map((deposit) => TransactionHistory.ofDeposit(deposit)),
      ...withdraws.map((withdraw) => TransactionHistory.ofWithdraw(withdraw)),
    ];
  }
}
