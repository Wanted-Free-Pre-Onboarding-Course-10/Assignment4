import { Account } from 'src/account/account.entity';
import { Withdraw } from 'src/withdraw/withdraw.entity';
import {
    CreateDateColumn,
    Entity,
    UpdateDateColumn,
    ManyToOne,
    OneToOne,
    JoinColumn
} from 'typeorm';
import { Base } from '../base.entity/base.entity';
@Entity()
export class Deposit extends Base {

    accountId: string;

    withdrawId: string;

    oldBalance: Number;

    newBalance: Number;

    amount: Number;

    @ManyToOne(() => Account, account => account.id, { onDelete: 'CASCADE' })
    account: Account;

    @OneToOne(() => Withdraw)
    @JoinColumn()
    withdraw: Withdraw;

}