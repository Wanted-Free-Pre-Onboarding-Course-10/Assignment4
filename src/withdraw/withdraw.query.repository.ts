import { EntityRepository, Repository } from 'typeorm';
import { Withdraw } from './withdraw.entity';

@EntityRepository(Withdraw)
export class WithdrawQueryRepository extends Repository<Withdraw> {
  getTransactionHistory(): Promise<Withdraw[]> {
    return this.createQueryBuilder('withdraw')
      .innerJoinAndSelect('withdraw.account', 'account')
      .getMany();
  }
}
