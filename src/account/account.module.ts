import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { AccountResolver } from './account.resolver';

@Module({
  controllers: [AccountController],
  providers: [AccountService, AccountResolver],
})
export class AccountModule {}
