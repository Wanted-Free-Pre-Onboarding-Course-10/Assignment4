import { Module } from '@nestjs/common';
import { AccountController } from './account/account.controller';
import { BalanceController } from './balance.controller';
import { BalanceService } from './balance.service';

@Module({
  controllers: [AccountController, BalanceController],
  providers: [BalanceService]
})
export class BalanceModule {}
