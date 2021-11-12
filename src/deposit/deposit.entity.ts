import { Account } from 'src/account/account.entity';
import { Withdraw } from 'src/withdraw/withdraw.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Base } from '../base.entity/base.entity';

@Entity()
export class Deposit extends Base {
  @Column({ type: 'unsigned big int', nullable: false, name: 'new_balance' })
  newBalance: number;

  @Column({ type: 'unsigned big int', nullable: false, name: 'old_balance' })
  oldBalance: number;

  @Column({ type: 'unsigned big int', nullable: false, name: 'amount' })
  amount: number;

  @ManyToOne(() => Account, (account) => account.deposits, {
    nullable: false,
  })
  @JoinColumn({
    name: 'account_id',
  })
  account: Account;

  @OneToOne(() => Withdraw, { nullable: true })
  @JoinColumn({
    name: 'withdraw_id',
  })
  withdraw: Withdraw;
}
