import { Args, Query, Resolver } from '@nestjs/graphql';
import { TransactionHistory } from './graph.transaction.history.entity';
import { AccountQueryService } from './account.query.service';
import { TransactionHistoryPaginationRequest } from './dto/transaction.history.pagination.request';
import { ValidationPipe } from '@nestjs/common';

@Resolver()
export class AccountResolver {
  constructor(private accountQueryService: AccountQueryService) {}

  @Query(() => [TransactionHistory])
  async getTransactionHistory(
    @Args(new ValidationPipe({ transform: true }))
    transactionHistoryPaginationRequest: TransactionHistoryPaginationRequest,
  ): Promise<[TransactionHistory[], number]> {
    return this.accountQueryService.getTransactionHistory(
      transactionHistoryPaginationRequest,
    );
  }
}
