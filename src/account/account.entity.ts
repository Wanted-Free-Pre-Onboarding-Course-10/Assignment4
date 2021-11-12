import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Base } from '../base.entity/base.entity';
import { User } from '../user/user.entity';
import { Deposit } from 'src/deposit/deposit.entity';
import { Withdraw } from 'src/withdraw/withdraw.entity';
import { Balance } from 'src/balance/balance.entity';

@Entity()
export class Account extends Base {
  @Column({ nullable: false, name: 'bankname' })
  bankname: string;

  @Column({ nullable: false, name: 'account_number', unique: true })
  accountNumber: string;

  @OneToMany(() => Deposit, (deposit) => deposit.account)
  deposits: Deposit[];

  @OneToMany(() => Withdraw, (withdraw) => withdraw.account, { eager: false })
  withdraws: Withdraw[];

  @ManyToOne(() => User, (user) => user.accounts, { eager: false })
  @JoinColumn({
    name: 'user_id',
  })
  user: User;

  @OneToOne(() => Balance, { nullable: false })
  @JoinColumn({
    name: 'balance_id',
  })
  balance: Balance;
}
