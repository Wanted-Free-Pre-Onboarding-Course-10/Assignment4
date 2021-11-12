import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DepositQueryRepository } from './deposit.query.repository';

@Injectable()
export class DepositQueryService {
  constructor(
    @InjectRepository(DepositQueryRepository)
    private depositQueryRepository: DepositQueryRepository,
  ) {}

  getTransactionHistory() {
    return this.depositQueryRepository.getTransactionHistory();
  }
}
