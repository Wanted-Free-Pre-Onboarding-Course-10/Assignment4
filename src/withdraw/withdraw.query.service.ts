import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WithdrawQueryRepository } from './withdraw.query.repository';

@Injectable()
export class WithdrawQueryService {
  constructor(
    @InjectRepository(WithdrawQueryRepository)
    private withdrawQueryRepository: WithdrawQueryRepository,
  ) {}

  getTransactionHistory() {
    return this.withdrawQueryRepository.getTransactionHistory();
  }
}
