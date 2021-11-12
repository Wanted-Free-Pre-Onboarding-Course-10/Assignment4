import { Module } from '@nestjs/common';
import { WithdrawService } from './withdraw.service';
import { WithdrawController } from './withdraw.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Balance } from "../balance/balance.entity";
import { Deposit } from "../deposit/deposit.entity";
import { Account } from "../account/account.entity";
import { User } from "../user/user.entity";
import { Withdraw } from '../withdraw/withdraw.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Balance,
    Deposit,
    Account,
    User,
    Withdraw])],
  providers: [WithdrawService],
  controllers: [WithdrawController],
})
export class WithdrawModule { }
