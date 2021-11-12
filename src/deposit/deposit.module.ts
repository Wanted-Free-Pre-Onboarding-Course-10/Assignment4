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

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DepositQueryRepository,
      Balance,
      Deposit,
      Account,
      User,
    ]),
  ],
  controllers: [DepositController],
  providers: [DepositService, DepositQueryService],
})
export class DepositModule {}
