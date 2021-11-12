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
  @Column({ type: 'unsigned big int', nullable: false, name: 'new_balance' })
  newBalance: number;

  @Column({ type: 'unsigned big int', nullable: false, name: 'old_balance' })
  oldBalance: number;

  @Column({ type: 'unsigned big int', nullable: false, name: 'amount' })
  amount: number;

  @ManyToOne(() => Account, (account) => account.withdraws, {
    nullable: false,
  })
  @JoinColumn({
    name: 'account_id',
  })
  account: Account;

  @OneToOne(() => Deposit, { nullable: true })
  @JoinColumn({
    name: 'deposit_id',
  })
  deposit: Deposit;
}
