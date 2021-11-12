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
  ): Promise<TransactionHistory[]> {
    const [transactionHistory, count] =
      await this.accountQueryService.getTransactionHistory(
        transactionHistoryPaginationRequest,
      );
    return transactionHistory.sort((a, b) =>
      a.transactionDate > b.transactionDate ? 1 : -1,
    );
  }
}
