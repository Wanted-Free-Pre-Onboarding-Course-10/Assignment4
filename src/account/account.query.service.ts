import { Injectable } from '@nestjs/common';
import { DepositQueryService } from '../deposit/deposit.query.service';
import { WithdrawQueryService } from '../withdraw/withdraw.query.service';
import { TransactionHistory } from './graph.transaction.history.entity';
import { TransactionHistoryPaginationRequest } from './dto/transaction.history.pagination.request';
import { AccountQueryRepository } from './account.query.repository';

@Injectable()
export class AccountQueryService {
  constructor(
    private depositQueryService: DepositQueryService,
    private withdrawQueryService: WithdrawQueryService,
    private accountQueryRepository: AccountQueryRepository,
  ) {}

  async getTransactionHistory(
    transactionHistoryPaginationRequest: TransactionHistoryPaginationRequest,
  ): Promise<[TransactionHistory[], number]> {
    const accountId: number = await this.accountQueryRepository.getAccountId(
      transactionHistoryPaginationRequest,
    );

    const searchType = transactionHistoryPaginationRequest.searchType;

    if (searchType === 'ALL') {
      const [deposits, depositCount] =
        await this.depositQueryService.getTransactionHistory(
          transactionHistoryPaginationRequest,
          accountId,
        );
      const [withdraws, withdrawCount] =
        await this.withdrawQueryService.getTransactionHistory(
          transactionHistoryPaginationRequest,
          accountId,
        );
      return [
        [
          ...deposits.map((deposit) => TransactionHistory.ofDeposit(deposit)),
          ...withdraws.map((withdraw) =>
            TransactionHistory.ofWithdraw(withdraw),
          ),
        ],
        depositCount + withdrawCount,
      ];
    } else if (searchType === 'DEPOSIT') {
      const [deposits, depositCount] =
        await this.depositQueryService.getTransactionHistory(
          transactionHistoryPaginationRequest,
          accountId,
        );
      return [
        [...deposits.map((deposit) => TransactionHistory.ofDeposit(deposit))],
        depositCount,
      ];
    } else if (searchType === 'WITHDRAW') {
      const [withdraws, withdrawCount] =
        await this.withdrawQueryService.getTransactionHistory(
          transactionHistoryPaginationRequest,
          accountId,
        );
      return [
        [
          ...withdraws.map((withdraw) =>
            TransactionHistory.ofWithdraw(withdraw),
          ),
        ],
        withdrawCount,
      ];
    }
  }
}
