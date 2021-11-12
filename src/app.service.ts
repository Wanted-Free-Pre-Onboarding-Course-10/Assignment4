import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { Connection, Repository } from 'typeorm';
import { Account } from './account/account.entity';
import { Balance } from './balance/balance.entity';
import { Deposit } from './deposit/deposit.entity';
import { Withdraw } from './withdraw/withdraw.entity';

@Injectable()
export class AppService {
  private logger = new Logger('SeedDataService');

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
    private connection: Connection,
  ) {}

  // == seed datas set == //
  async getSeedDatas(): Promise<string> {
    let i = 0;
    for (i = 0; i < 5; i++) {
      const queryRunner = this.connection.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();
      try {
        // == 해당 유저의 잔액과 account생성 로직 ==//
        //user create
        const createdUser: User = this.userRepository.create({
          username: `유저${i}`,
          password: `비밀번호${i}`,
        });

        await this.userRepository.save(createdUser);

        //balance1 create
        const createdBalance = this.balanceRepository.create({
          balance: 0,
        });

        await this.balanceRepository.save(createdBalance);

        //account1 create - 여러개일수도 있음
        const createdAccount = this.accountRepository.create({
          bankname: `은행${i} - a`,
          accountNumber: `계좌번호${i}a`,
          user: createdUser,
          balance: createdBalance,
        });

        const resultCreatedAccount = await this.accountRepository.save(
          createdAccount,
        );

        //balance1 create
        const createdBalance1 = this.balanceRepository.create({
          balance: 0,
        });

        await this.balanceRepository.save(createdBalance1);

        //account1 create - 여러개일수도 있음
        const createdAccount1 = this.accountRepository.create({
          bankname: `은행${i} - b`,
          accountNumber: `계좌번호${i}b`,
          user: createdUser,
          balance: createdBalance1,
        });

        const resultCreatedAccount1 = await this.accountRepository.save(
          createdAccount1,
        );

        //balance1 create
        const createdBalance2 = this.balanceRepository.create({
          balance: 0,
        });

        await this.balanceRepository.save(createdBalance2);

        //account1 create - 여러개일수도 있음
        const createdAccount2 = this.accountRepository.create({
          bankname: `은행${i} - c`,
          accountNumber: `계좌번호${i}c`,
          user: createdUser,
          balance: createdBalance2,
        });

        await this.accountRepository.save(createdAccount2);

        // == 거래내역 데이터 시드 생성 == //

        //deposit 거래 내역 생성
        const amount = 100;
        const createdDeposit = this.depositRepository.create({
          newBalance: 0 + amount,
          oldBalance: 0,
          amount: amount,
          account: createdAccount,
        });

        await this.depositRepository.save(createdDeposit);

        // == 입금을 했으니 잔액 증가 == //
        const account: Account = await queryRunner.manager
          .getRepository(Account)
          .findOne({
            where: { id: resultCreatedAccount.id },
            relations: ['balance'],
          });

        await this.balanceRepository.update(account.balance.id, {
          balance: account.balance.balance + createdDeposit.amount,
        });

        const createdDeposit1 = this.depositRepository.create({
          newBalance: 100 + amount,
          oldBalance: 100,
          amount: amount,
          account: createdAccount,
        });

        await this.depositRepository.save(createdDeposit1);

        // == 입금을 했으니 잔액 증가 == //
        const account2: Account = await queryRunner.manager
          .getRepository(Account)
          .findOne({
            where: { id: resultCreatedAccount.id },
            relations: ['balance'],
          });

        await this.balanceRepository.update(account2.balance.id, {
          balance: account2.balance.balance + createdDeposit1.amount,
        });

        const amount2 = 50;
        //withdraw 거래내역 생성
        const createdWithdraw = this.withdrawRepository.create({
          newBalance: 200 - amount2,
          oldBalance: 200,
          amount: amount2,
          account: createdAccount,
        });

        await this.withdrawRepository.save(createdWithdraw);

        // == 출금을 했으니 잔액 감소 == //
        const account3: Account = await queryRunner.manager
          .getRepository(Account)
          .findOne({
            where: { id: resultCreatedAccount.id },
            relations: ['balance'],
          });

        await this.balanceRepository.update(account3.balance.id, {
          balance: account3.balance.balance - createdWithdraw.amount,
        });

        const createdWithdraw1 = this.withdrawRepository.create({
          newBalance: 100,
          oldBalance: 150,
          amount: amount2,
          account: createdAccount,
        });

        await this.withdrawRepository.save(createdWithdraw1);

        // == 출금을 했으니 잔액 감소 == //
        const account4: Account = await queryRunner.manager
          .getRepository(Account)
          .findOne({
            where: { id: resultCreatedAccount.id },
            relations: ['balance'],
          });

        await this.balanceRepository.update(account4.balance.id, {
          balance: account4.balance.balance - createdWithdraw1.amount,
        });

        //송금 거래내역 - 로그인한 유저가 자신의 계좌의 돈을 뺴서 다른 계좌에 입금
        //== 송금한 계좌의 거래내역 생성 == //
        const amount3 = 25;
        const createdWithdrawForSend: Withdraw = this.withdrawRepository.create(
          {
            newBalance: 75,
            oldBalance: 100,
            amount: amount3,
            account: createdAccount,
          },
        );

        const resultWithdrawForSend: Withdraw =
          await this.withdrawRepository.save(createdWithdrawForSend);

        // == 송금을 했으니 송금한 계좌 잔액 감소 == //
        const account5: Account = await queryRunner.manager
          .getRepository(Account)
          .findOne({
            where: { id: resultCreatedAccount.id },
            relations: ['balance'],
          });

        await this.balanceRepository.update(account5.balance.id, {
          balance: account5.balance.balance - createdWithdrawForSend.amount,
        });

        //== 송금받은 계좌의 거래내역 생성 == //
        const createdDepositForReceive: Deposit = this.depositRepository.create(
          {
            newBalance: 25,
            oldBalance: 0,
            amount: amount3,
            account: createdAccount1, // 송금할 계좌 (목표 계좌)
          },
        );

        const resultDepositForSend: Deposit = await this.depositRepository.save(
          createdDepositForReceive,
        );

        // == 송금을 받았으니 송금받은 계좌 잔액 감소 == //
        const account6: Account = await queryRunner.manager
          .getRepository(Account)
          .findOne({
            where: { id: resultCreatedAccount1.id },
            relations: ['balance'],
          });

        await this.balanceRepository.update(account6.balance.id, {
          balance: account6.balance.balance + createdDepositForReceive.amount,
        });

        // 송금한 계좌 거래내역, 송금받은 계좌 거래내역 업데이트
        const deposit: Deposit = await this.depositRepository.findOne(
          resultDepositForSend.id,
        );
        const withdraw: Withdraw = await this.withdrawRepository.findOne(
          resultWithdrawForSend.id,
        );

        await this.withdrawRepository.update(withdraw.id, { deposit: deposit });
        await this.depositRepository.update(deposit.id, { withdraw: withdraw });

        await queryRunner.commitTransaction();
      } catch (error) {
        this.logger.error(error);
        await queryRunner.rollbackTransaction();
      } finally {
        await queryRunner.release();
      }
    }

    return 'seed data create 성공';
  }
}
