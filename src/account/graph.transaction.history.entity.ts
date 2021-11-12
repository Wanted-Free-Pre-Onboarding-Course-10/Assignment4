import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TransactionHistory {
  @Field()
  id!: string;

  @Field()
  transactionDate: string;

  @Field()
  transactionAmount: number;

  @Field()
  balance: number;

  @Field()
  transactionType: string;

  @Field()
  etc: string;
}
