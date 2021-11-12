import { Module } from '@nestjs/common';
import { DepositController } from './deposit.controller';
import { DepositService } from './deposit.service';
import { DepositQueryService } from './deposit.query.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepositQueryRepository } from './deposit.query.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DepositQueryRepository])],
  controllers: [DepositController],
  providers: [DepositService, DepositQueryService],
})
export class DepositModule {}
