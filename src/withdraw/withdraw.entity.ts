import { Base } from '../base.entity/base.entity';
import { Account } from 'src/account/account.entity';
import {
  BeforeInsert,
  Column,
  ManyToOne,
  Entity,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { IsNotEmpty, IsString, Length } from 'class-validator';
import { Deposit } from 'src/deposit/deposit.entity';

@Entity()
export class Withdraw extends Base {
  accountId: Number;

  depositId: Number;

  balance: Number;

  @ManyToOne(() => Account, (account) => account.id, { onDelete: 'CASCADE' })
  account: Account;

  @OneToOne(() => Deposit)
  @JoinColumn()
  deposit: Deposit;
}
