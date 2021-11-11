import { Module } from '@nestjs/common';
import { BalanceService } from './balance.service';
import { BalanceController } from "./balance.controller";
//test - prettier
@Module({
  controllers: [BalanceController],
  providers: [BalanceService],
})
export class BalanceModule {}
