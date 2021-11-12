import { EntityRepository, Repository } from 'typeorm';
import { Deposit } from './deposit.entity';

@EntityRepository(Deposit)
export class DepositQueryRepository extends Repository<Deposit> {
  getTransactionHistory(): Promise<Deposit[]> {
    return this.createQueryBuilder('deposits')
      .innerJoinAndSelect('deposits.account', 'account')
      .getMany();
  }
}
