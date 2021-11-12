import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DepositQueryRepository } from './deposit.query.repository';
import { TransactionHistoryPaginationRequest } from '../account/dto/transaction.history.pagination.request';

@Injectable()
export class DepositQueryService {
  constructor(
    @InjectRepository(DepositQueryRepository)
    private depositQueryRepository: DepositQueryRepository,
  ) {}

  getTransactionHistory(
    transactionHistoryPaginationRequest: TransactionHistoryPaginationRequest,
    accountId: number,
  ) {
    return this.depositQueryRepository.getTransactionHistory(
      transactionHistoryPaginationRequest,
      accountId,
    );
  }
}
