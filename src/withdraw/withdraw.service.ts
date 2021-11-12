import { Injectable } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { UpdateWithDrawDto } from '../withdraw/dto/update.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Balance } from '../balance/balance.entity';
import { Deposit } from '../deposit/deposit.entity';
import { Account } from '../account/account.entity';
import { Withdraw } from './withdraw.entity';
import { RemittanceService } from '../remittance/remittance.service'
import { WITHDRAW_SUCCESS_MSG } from "../message/message"
@Injectable()
export class WithdrawService extends RemittanceService {

  constructor(@InjectRepository(Deposit) protected depositRepository: Repository<Deposit>,
    @InjectRepository(Balance) protected balanceRepository: Repository<Balance>,
    @InjectRepository(Account) protected accountRepository: Repository<Account>,
    @InjectRepository(Withdraw) protected withdrawRepositry: Repository<Withdraw>,
    protected connection: Connection) {
    super(depositRepository, balanceRepository, accountRepository, withdrawRepositry, connection);
  }

  async withdrawMe(updateWithdrawInfo: UpdateWithDrawDto, user: number): Promise<any> {
    const { withdrawAmount, accountNumber } = updateWithdrawInfo;
    // 해당 계좌 정보 조회
    const account = await this.findByAccountNumber(accountNumber);
    // // 권한 조회
    const auth = await this.authCheck(account.id, user);
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      // 잔액 조회
      const exAccount = await this.balanceCheck(queryRunner, account, withdrawAmount);
      // 해당 출금 계좌 거래 가능 조회
      const amountAfterTransaction = await this.confirmTradable(exAccount, withdrawAmount);
      // 출금 내역 생성 및 정산
      const withdrawData = await this.withdraw(queryRunner, exAccount, withdrawAmount, amountAfterTransaction);
      await queryRunner.commitTransaction();
      return WITHDRAW_SUCCESS_MSG(accountNumber, withdrawAmount, withdrawData.newBalance);
    } catch (error) {
      console.error(error);
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
