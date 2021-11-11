import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AccountModule } from './account/account.module';
import { BalanceModule } from './balance/balance.module';
import { WithdrawModule } from './withdraw/withdraw.module';
import { DepositModule } from './deposit/deposit.module';


@Module({
  imports: [UserModule, AccountModule, BalanceModule, WithdrawModule, DepositModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
