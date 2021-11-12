import { EntityRepository, Repository } from 'typeorm';
import { Deposit } from './deposit.entity';
import { TransactionHistoryPaginationRequest } from '../account/dto/transaction.history.pagination.request';
import * as moment from 'moment';

@EntityRepository(Deposit)
export class DepositQueryRepository extends Repository<Deposit> {
  async getTransactionHistory(
    transactionHistoryPaginationRequest: TransactionHistoryPaginationRequest,
    accountId: number,
  ): Promise<[Deposit[], number]> {
    const paginationDeposit = this.getPaginationDeposit(
      transactionHistoryPaginationRequest.getOffset(),
      transactionHistoryPaginationRequest,
      accountId,
    );

    if (transactionHistoryPaginationRequest.getOffset() == 0) {
      const fixedPageCount =
        10 * transactionHistoryPaginationRequest.getLimit();
      return [await paginationDeposit, fixedPageCount];
    }

    const totalCount = await this.getCoveringIndexQueryBuilder(
      transactionHistoryPaginationRequest.getOffset(),
      transactionHistoryPaginationRequest,
      accountId,
    ).getCount();

    if (totalCount > transactionHistoryPaginationRequest.getOffset()) {
      return [await paginationDeposit, totalCount];
    }

    return [
      await this.getPaginationDeposit(
        Math.floor(
          totalCount / transactionHistoryPaginationRequest.getLimit(),
        ) * transactionHistoryPaginationRequest.getLimit(),
        transactionHistoryPaginationRequest,
        accountId,
      ),
      totalCount,
    ];
  }

  getCoveringIndexQueryBuilder(
    offset,
    transactionHistoryPaginationRequest: TransactionHistoryPaginationRequest,
    accountId: number,
  ) {
    const start = moment(transactionHistoryPaginationRequest.startDate).format(
      'YYYY-MM-DD HH:MM:SS',
    );

    const end = moment(transactionHistoryPaginationRequest.endDate).format(
      'YYYY-MM-DD HH:MM:SS',
    );

    return this.createQueryBuilder('covers')
      .select(['covers.id'])
      .limit(transactionHistoryPaginationRequest.limit)
      .offset(offset)
      .where(
        `covers.created_at BETWEEN "${start}" AND "${end}" AND covers.account = ${accountId}`,
      )
      .orderBy('covers.id', transactionHistoryPaginationRequest.orderType);
  }

  async getPaginationDeposit(
    offset,
    transactionHistoryPaginationRequest: TransactionHistoryPaginationRequest,
    accountId: number,
  ) {
    return await this.createQueryBuilder('deposit')
      .innerJoin(
        `(${this.getCoveringIndexQueryBuilder(
          offset,
          transactionHistoryPaginationRequest,
          accountId,
        ).getQuery()})`,
        'covers',
        'deposit.id = covers.covers_id',
      )
      .innerJoinAndSelect('deposit.account', 'account')
      .select(['deposit', 'account.accountNumber'])
      .getMany();
  }
}
