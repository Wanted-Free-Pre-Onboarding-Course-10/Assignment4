import { Field, ObjectType } from '@nestjs/graphql';
import { Deposit } from '../deposit/deposit.entity';
import { Withdraw } from '../withdraw/withdraw.entity';

@ObjectType()
export class TransactionHistory {
  constructor(
    id: number,
    transactionDate: Date,
    transactionAmount: number,
    balance: number,
    transactionType: string,
    etc: string,
  ) {
    this.id = id;
    this.transactionDate = transactionDate;
    this.transactionAmount = transactionAmount;
    this.balance = balance;
    this.transactionType = transactionType;
    this.etc = etc;
  }

  @Field()
  id!: number;

  @Field()
  transactionDate: Date;

  @Field()
  transactionAmount: number;

  @Field()
  balance: number;

  @Field()
  transactionType: string;

  @Field()
  etc: string;

  static ofDeposit(deposit: Deposit): TransactionHistory {
    return new TransactionHistory(
      deposit.id,
      deposit.created_at,
      deposit.amount,
      deposit.newBalance,
      '입금',
      '비고',
    );
  }

  static ofWithdraw(withdraw: Withdraw): TransactionHistory {
    return new TransactionHistory(
      withdraw.id,
      withdraw.created_at,
      withdraw.amount,
      withdraw.newBalance,
      '출금',
      '비고',
    );
  }
}
