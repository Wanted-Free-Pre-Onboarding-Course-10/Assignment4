import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AccountModule } from './account/account.module';
import { BalanceModule } from './balance/balance.module';
import { WithdrawModule } from './withdraw/withdraw.module';
import { DepositModule } from './deposit/deposit.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/ormconfig';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './user/user.entity';
import { Account } from './account/account.entity';
import { Balance } from './balance/balance.entity';
import { Deposit } from './deposit/deposit.entity';
import { Withdraw } from './withdraw/withdraw.entity';
import { WithdrawQueryRepository } from './withdraw/withdraw.query.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    AccountModule,
    BalanceModule,
    WithdrawModule,
    DepositModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gpl',
    }),
    TypeOrmModule.forFeature([
      User,
      Account,
      Balance,
      Deposit,
      Withdraw,
      WithdrawQueryRepository,
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
