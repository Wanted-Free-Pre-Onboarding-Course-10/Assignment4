import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepositController } from './deposit.controller';
import { DepositService } from './deposit.service';
import { DepositQueryService } from './deposit.query.service';
import { DepositQueryRepository } from './deposit.query.repository';
import { Deposit } from '../deposit/deposit.entity';
import { Account } from '../account/account.entity';
import { User } from '../user/user.entity';
import { Balance } from '../balance/balance.entity';
import { Withdraw } from '../withdraw/withdraw.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DepositQueryRepository,
      Balance,
      Deposit,
      Account,
      User,
      Withdraw
    ]),
    UserModule
  ],
  controllers: [DepositController],
  providers: [DepositService, DepositQueryService],
})
export class DepositModule { }
