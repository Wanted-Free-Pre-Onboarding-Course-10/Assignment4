import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepositController } from './deposit.controller';
import { DepositService } from './deposit.service';
import { Balance } from "../balance/balance.entity";
import { Deposit } from "../deposit/deposit.entity";
import { Account } from "../account/account.entity";
import { User } from "../user/user.entity";
@Module({
  imports: [TypeOrmModule.forFeature([Balance, Deposit, Account, User])],
  controllers: [DepositController],
  providers: [DepositService],
})
export class DepositModule { }
