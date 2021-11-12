import { Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { Base } from '../base.entity/base.entity';
import { User } from '../user/user.entity';
import { Deposit } from 'src/deposit/deposit.entity';
import { Withdraw } from 'src/withdraw/withdraw.entity';
import { Balance } from 'src/balance/balance.entity';

@Entity()
export class Account extends Base {
  userId: number;

  balanceId: number;

  bankname: string;

  accountNumber: string;

  @OneToMany(() => Deposit, (deposit) => deposit.account)
  deposits: Deposit[];

  @OneToMany(() => Withdraw, (withdraw) => withdraw.account)
  withdraws: Withdraw[];

  @ManyToOne(() => User, (user) => user.accounts, { onDelete: 'CASCADE' })
  user: User;

  @OneToOne(() => Balance)
  @JoinColumn()
  balance: Balance;
}
