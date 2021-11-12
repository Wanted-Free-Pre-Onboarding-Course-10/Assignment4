import { Module } from '@nestjs/common';
import { WithdrawService } from './withdraw.service';
import { WithdrawController } from './withdraw.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Balance } from "../balance/balance.entity";
import { Deposit } from "../deposit/deposit.entity";
import { Account } from "../account/account.entity";
import { User } from "../user/user.entity";
import { Withdraw } from '../withdraw/withdraw.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Balance, User, Deposit, Account, Withdraw, User]),
    UserModule],
  providers: [WithdrawService],
  controllers: [WithdrawController],
})
export class WithdrawModule { }
