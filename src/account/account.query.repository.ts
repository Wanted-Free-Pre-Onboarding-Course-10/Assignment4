import { EntityRepository, Repository } from 'typeorm';
import { TransactionHistoryPaginationRequest } from '../account/dto/transaction.history.pagination.request';
import { Account } from './account.entity';

@EntityRepository(Account)
export class AccountQueryRepository extends Repository<Account> {
  async getAccountId(
    transactionHistoryPaginationRequest: TransactionHistoryPaginationRequest,
  ): Promise<number> {
    const result = await this.findOne({
      where: {
        accountNumber: transactionHistoryPaginationRequest.accountNumber,
      },
    });

    return result.id;
  }
}
