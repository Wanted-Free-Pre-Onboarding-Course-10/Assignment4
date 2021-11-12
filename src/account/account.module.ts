import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { AccountResolver } from './account.resolver';
import { AccountQueryService } from './account.query.service';
import { DepositQueryService } from '../deposit/deposit.query.service';
import { WithdrawQueryService } from '../withdraw/withdraw.query.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepositQueryRepository } from '../deposit/deposit.query.repository';
import { WithdrawQueryRepository } from '../withdraw/withdraw.query.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([DepositQueryRepository, WithdrawQueryRepository]),
  ],
  controllers: [AccountController],
  providers: [
    AccountService,
    AccountQueryService,
    DepositQueryService,
    WithdrawQueryService,
    AccountResolver,
  ],
})
export class AccountModule {}
