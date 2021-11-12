import { EntityRepository, Repository } from 'typeorm';
import { Withdraw } from './withdraw.entity';
import { TransactionHistoryPaginationRequest } from '../account/dto/transaction.history.pagination.request';
import * as moment from 'moment';

@EntityRepository(Withdraw)
export class WithdrawQueryRepository extends Repository<Withdraw> {
  async getTransactionHistory(
    transactionHistoryPaginationRequest: TransactionHistoryPaginationRequest,
    accountId: number,
  ): Promise<[Withdraw[], number]> {
    const paginationWithdraw = this.getPaginationWithDraw(
      transactionHistoryPaginationRequest.getOffset(),
      transactionHistoryPaginationRequest,
      accountId,
    );

    if (transactionHistoryPaginationRequest.getOffset() == 0) {
      const fixedPageCount =
        10 * transactionHistoryPaginationRequest.getLimit();
      return [await paginationWithdraw, fixedPageCount];
    }

    const totalCount = await this.getCoveringIndexQueryBuilder(
      transactionHistoryPaginationRequest.getOffset(),
      transactionHistoryPaginationRequest,
      accountId,
    ).getCount();

    if (totalCount > transactionHistoryPaginationRequest.getOffset()) {
      return [await paginationWithdraw, totalCount];
    }

    return [
      await this.getPaginationWithDraw(
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

  async getPaginationWithDraw(
    offset,
    transactionHistoryPaginationRequest: TransactionHistoryPaginationRequest,
    accountId: number,
  ) {
    return await this.createQueryBuilder('withdraws')
      .innerJoin(
        `(${this.getCoveringIndexQueryBuilder(
          offset,
          transactionHistoryPaginationRequest,
          accountId,
        ).getQuery()})`,
        'covers',
        'withdraws.id = covers.covers_id',
      )
      .innerJoinAndSelect('withdraws.account', 'account')
      .select(['withdraws', 'account.accountNumber'])
      .getMany();
  }
}
