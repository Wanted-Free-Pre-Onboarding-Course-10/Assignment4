import {
    Entity,
    OneToOne,
    JoinColumn
} from 'typeorm';

import { IsNotEmpty } from 'class-validator';
import { Base } from '../base.entity/base.entity';
import { Account } from 'src/account/account.entity';
@Entity()
export class Balance extends Base {

    @IsNotEmpty()
    balance: Number;


    @OneToOne(() => Account)
    @JoinColumn()
    account: Account;

}