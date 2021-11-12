import { Module } from '@nestjs/common';
import { WithdrawService } from './withdraw.service';
import { WithdrawController } from './withdraw.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WithdrawQueryRepository } from './withdraw.query.repository';
import { WithdrawQueryService } from './withdraw.query.service';

@Module({
  imports: [TypeOrmModule.forFeature([WithdrawQueryRepository])],
  providers: [WithdrawService, WithdrawQueryService],
  controllers: [WithdrawController],
})
export class WithdrawModule {}
