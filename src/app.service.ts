import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { Repository, Transaction } from 'typeorm';
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
    for (i = 0; i < 5; i++) {
      //user create
      const createdUser: User = this.userRepository.create({
        username: `유저${i}`,
        password: `비밀번호${i}`,
      });

      await this.userRepository.save(createdUser);

      // == 해당 유저의 잔액과 account생성 로직 ==//
      //balance1 create
      const createdBalance = this.balanceRepository.create({
        balance: i,
      });

      await this.balanceRepository.save(createdBalance);

      //account1 create - 여러개일수도 있음
      const createdAccount = this.accountRepository.create({
        bankname: `은행${i} - a`,
        accountNumber: `계좌번호${i}`,
        user: createdUser,
        balance: createdBalance,
      });

      await this.accountRepository.save(createdAccount);

      //balance1 create
      const createdBalance1 = this.balanceRepository.create({
        balance: i,
      });

      await this.balanceRepository.save(createdBalance1);

      //account1 create - 여러개일수도 있음
      const createdAccount1 = this.accountRepository.create({
        bankname: `은행${i} - b`,
        accountNumber: `계좌번호${i}`,
        user: createdUser,
        balance: createdBalance1,
      });

      await this.accountRepository.save(createdAccount1);

      //balance1 create
      const createdBalance2 = this.balanceRepository.create({
        balance: i,
      });

      await this.balanceRepository.save(createdBalance2);

      //account1 create - 여러개일수도 있음
      const createdAccount2 = this.accountRepository.create({
        bankname: `은행${i} - c`,
        accountNumber: `계좌번호${i}`,
        user: createdUser,
        balance: createdBalance2,
      });

      await this.accountRepository.save(createdAccount2);

      // == 거래내역 데이터 시드 생성 == //
      //deposit 거래 내역 생성
      const createdDeposit = this.depositRepository.create({
        newBalance: i + 100,
        oldBalance: i,
        amount: 100,
        account: createdAccount,
      });

      await this.depositRepository.save(createdDeposit);

      const createdDeposit1 = this.depositRepository.create({
        newBalance: i + 100 + 100,
        oldBalance: i + 100,
        amount: 100,
        account: createdAccount,
      });

      await this.depositRepository.save(createdDeposit1);

      //withdraw 거래내역 생성
      const createdWithdraw = this.withdrawRepository.create({
        newBalance: i,
        oldBalance: i + 100,
        amount: 100,
        account: createdAccount,
      });

      await this.withdrawRepository.save(createdWithdraw);

      const createdWithdraw1 = this.withdrawRepository.create({
        newBalance: i + 100,
        oldBalance: i + 100 + 100,
        amount: 100,
        account: createdAccount,
      });

      await this.withdrawRepository.save(createdWithdraw1);

      //송금 거래내역 - 로그인한 유저가 자신의 계좌의 돈을 뺴서 다른 계좌에 입금
      //== 송금한 계좌의 거래내역 생성 == //
      const createdWithdrawForSend: Withdraw = this.withdrawRepository.create({
        newBalance: i,
        oldBalance: i + 100,
        amount: 100,
        account: createdAccount,
      });

      const resultWithdrawForSend: Withdraw =
        await this.withdrawRepository.save(createdWithdrawForSend);

      //== 송금받은 계좌의 거래내역 생성 == //
      const createdDepositForReceive: Deposit = this.depositRepository.create({
        newBalance: i + 1000 + createdWithdrawForSend.amount,
        oldBalance: i + 1000,
        amount: createdWithdrawForSend.amount,
        account: createdAccount1, // 송금할 계좌 (목표 계좌)
      });

      const resultDepositForSend: Deposit = await this.depositRepository.save(
        createdDepositForReceive,
      );

      const deposit: Deposit = await this.depositRepository.findOne(
        resultDepositForSend.id,
      );
      const withdraw: Withdraw = await this.withdrawRepository.findOne(
        resultWithdrawForSend.id,
      );

      await this.withdrawRepository.update(withdraw.id, { deposit: deposit });
      await this.depositRepository.update(deposit.id, { withdraw: withdraw });
    }

    return 'seed data create 성공';
  }
}
