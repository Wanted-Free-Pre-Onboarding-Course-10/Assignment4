import { Module } from '@nestjs/common';
import { RemittanceService } from './remittance.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RemittanceController } from './remittance.controller';
import { Deposit } from '../deposit/deposit.entity';
import { Account } from '../account/account.entity';
import { User } from '../user/user.entity';
import { Balance } from '../balance/balance.entity';
import { Withdraw } from '../withdraw/withdraw.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Balance,
      Deposit,
      Account,
      User,
      Withdraw
    ]),
  ],
  providers: [RemittanceService],
  controllers: [RemittanceController]
})
export class RemittanceModule { }

