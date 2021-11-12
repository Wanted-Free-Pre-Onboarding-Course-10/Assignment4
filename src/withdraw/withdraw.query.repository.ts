import { EntityRepository, Repository } from 'typeorm';
import { Withdraw } from './withdraw.entity';

@EntityRepository(Withdraw)
export class WithdrawQueryRepository extends Repository<Withdraw> {
  getTransactionHistory(): Promise<Withdraw[]> {
    return this.createQueryBuilder('boards')
      .innerJoinAndSelect('boards.user', 'user')
      .select(['boards', 'user.userId', 'user.nickname'])
      .getMany();
  }
}
