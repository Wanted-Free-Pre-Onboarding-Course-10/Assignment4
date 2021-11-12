import { Query, Resolver } from '@nestjs/graphql';
import { TransactionHistory } from './graph.transaction.history.entity';
import { AccountQueryService } from './account.query.service';

@Resolver()
export class AccountResolver {
  constructor(private accountQueryService: AccountQueryService) {}

  @Query(() => [TransactionHistory])
  async getTransactionHistory(): Promise<TransactionHistory[]> {
    return await this.accountQueryService.getTransactionHistory();
  }
}
