import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AccountModule } from './account/account.module';
import { BalanceModule } from './balance/balance.module';
import { WithdrawModule } from './withdraw/withdraw.module';
import { DepositModule } from './deposit/deposit.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/ormconfig';
import { GraphQLModule } from '@nestjs/graphql';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
