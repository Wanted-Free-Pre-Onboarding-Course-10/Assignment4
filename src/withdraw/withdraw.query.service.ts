import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WithdrawQueryRepository } from './withdraw.query.repository';
import { TransactionHistoryPaginationRequest } from '../account/dto/transaction.history.pagination.request';

@Injectable()
export class WithdrawQueryService {
  constructor(
    @InjectRepository(WithdrawQueryRepository)
    private withdrawQueryRepository: WithdrawQueryRepository,
  ) { }

  getTransactionHistory(
    transactionHistoryPaginationRequest: TransactionHistoryPaginationRequest,
    accountId: number,
  ) {
    return this.withdrawQueryRepository.getTransactionHistory(
      transactionHistoryPaginationRequest,
      accountId,
    );
  }
}
