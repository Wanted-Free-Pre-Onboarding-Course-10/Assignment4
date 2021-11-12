import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { Repository } from 'typeorm';
import { Account } from './account/account.entity';
import { Balance } from './balance/balance.entity';
import { Deposit } from './deposit/deposit.entity';
import { Withdraw } from './withdraw/withdraw.entity';

@Injectable()
export class AppService {
  private logger = new Logger('UserService');

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
    @InjectRepository(Balance)
    private balanceRepository: Repository<Balance>,
    @InjectRepository(Deposit)
    private depositRepository: Repository<Deposit>,
    @InjectRepository(Withdraw)
    private withdrawRepository: Repository<Withdraw>,
  ) {}

  // == seed datas set == //
  async getSeedDatas(): Promise<string> {
    let i = 0;
    for (i = 0; i < 100; i++) {
      console.log('//////////' + i + '//////////');
      //user create
      const createdUser: User = this.userRepository.create({
        username: `유저${i}`,
        password: `비밀번호${i}`,
      });

      console.log(createdUser);
      await this.userRepository.save(createdUser);

      //balance create
      const createdBalance = this.balanceRepository.create({
        balance: i,
      });

      await this.balanceRepository.save(createdBalance);

      //account create - 여러개일수도 있음
      const createdAccount = this.accountRepository.create({
        bankname: `은행${i}`,
        accountNumber: `계좌번호${i}`,
        user: createdUser,
        balance: createdBalance,
      });

      await this.accountRepository.save(createdAccount);

      //deposit 거래 내역 생성
      const createdDeposit = this.depositRepository.create({
        newBalance: i,
        oldBalance: i + 100,
        amount: 100,
        account: createdAccount,
      });

      await this.depositRepository.save(createdDeposit);

      //withdraw 거래내역 생성
      const createdWithdraw = this.withdrawRepository.create({
        newBalance: i + 100,
        oldBalance: i,
        amount: 100,
        account: createdAccount,
      });

      await this.withdrawRepository.save(createdWithdraw);

      //송금 거래내역 - 로그인한 유저가 자신의 계좌의 돈을 뺴서 다른 계좌에 입금
      const createdWithdrawForSend = this.withdrawRepository.create({
        newBalance: i + 100,
        oldBalance: i,
        amount: 100,
        account: createdAccount,
      });
      await this.depositRepository.save(createdWithdrawForSend);

      const createdDepositForReceive = this.depositRepository.create({
        newBalance: i + 1000,
        oldBalance: i + 1000 - createdWithdrawForSend.amount,
        amount: createdWithdrawForSend.amount,
        account: createdAccount,
      });

      await this.depositRepository.save(createdDepositForReceive);

      // 송금 거래내역 추가
      createdWithdrawForSend.deposit = createdDepositForReceive;
      await this.depositRepository.save(createdWithdrawForSend);
    }
    return 'seed data create 성공';
  }
}
