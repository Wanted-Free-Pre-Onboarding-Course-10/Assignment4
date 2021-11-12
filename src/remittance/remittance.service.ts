import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Deposit } from '../deposit/deposit.entity';
import { Balance } from '../balance/balance.entity';
import { Account } from '../account/account.entity';
import { Withdraw } from 'src/withdraw/withdraw.entity';
import { Connection, QueryRunner, Repository } from 'typeorm';
import { UpdateWithRemitDto } from './dto/update.dto';

@Injectable()
export class RemittanceService {
  // 생성자
  constructor(
    @InjectRepository(Deposit) private depositRepository: Repository<Deposit>,
    @InjectRepository(Balance) private balanceRepository: Repository<Balance>,
    @InjectRepository(Account) private accountRepository: Repository<Account>,
    @InjectRepository(Withdraw) private withdrawRepositry: Repository<Withdraw>,
    private connection: Connection,
  ) {}


  // 계좌번호로 계좌 정보 조회
  async findByAccountNumber(accountNumber: string): Promise<any> {
    const account = await this.accountRepository.findOne({
      where: { accountNumber: accountNumber },
    });
    if (account === undefined) {
      throw new Error("The account doesn't exist.");
    }
    return account;
  }

  // 해당 계좌 권한 조회
  async authCheck(accountId: number, userId: number): Promise<any> {
    const auth = await this.accountRepository.findOne({
      where: { id: accountId, user: { id: userId } },
      relations: ['user'],
    });
    if (auth === undefined) {
      throw new Error("You don't have edit permission");
    }
    return auth;
  }

  //잔액 조회
  async balanceCheck(
    queryRunner: QueryRunner,
    account: Account,
    withdrawAmount: number,
  ): Promise<any> {
    const exAccount: Account = await queryRunner.manager
      .getRepository(Account)
      .findOne({
        where: { id: account.id },
        relations: ['balance'],
      });
    return exAccount;
  }

  // 출금 가능 확인
  async confirmTradable(exAccount: Account, withdrawAmount: number) {
    const amountAfterTransaction = exAccount.balance.balance - withdrawAmount;
    // 현재 잔액 - 출금액
    if (amountAfterTransaction < 0) throw Error('잔액이 부족합니다');
    return amountAfterTransaction;
  }

  //출금 내역 생성 및 정산
  async withdraw(
    queryRunner: QueryRunner,
    exAccount: Account,
    withdrawAmount: number,
    amountAfterTransaction: number,
  ): Promise<any> {
    const oldBalance: number = exAccount.balance.balance;
    const newBalance: number = amountAfterTransaction;
    const withdrawInfo = {
      account: exAccount,
      oldBalance: oldBalance,
      newBalance: newBalance,
      amount: withdrawAmount,
    };
    const withdraw = await queryRunner.manager
      .getRepository(Withdraw)
      .save(withdrawInfo);
    exAccount.balance.balance = newBalance;
    const updateBalance = await queryRunner.manager
      .getRepository(Balance)
      .save(exAccount.balance);
    return withdraw;
  }

  //입금 내역 생성 및 정산
  async deposit(
    queryRunner: QueryRunner,
    exAccount: Account,
    withdrawAmount: number,
  ): Promise<any> {
    const oldBalance: number = exAccount.balance.balance;
    const newBalance: number = exAccount.balance.balance + withdrawAmount;
    const depositInfo = {
      account: exAccount,
      oldBalance: oldBalance,
      newBalance: newBalance,
      amount: withdrawAmount,
    };
    const deposit = await queryRunner.manager
      .getRepository(Deposit)
      .save(depositInfo);
    exAccount.balance.balance = newBalance;
    const updateBalance = await queryRunner.manager
      .getRepository(Balance)
      .save(exAccount.balance);
    return deposit;
  }

  // 출입금 내역 연결
  async interlink(
    queryRunner: QueryRunner,
    withdraw: Withdraw,
    deposit: Deposit,
  ) {
    withdraw.deposit = deposit;
    await queryRunner.manager.getRepository(Withdraw).save(withdraw);
    deposit.withdraw = withdraw;
    await queryRunner.manager.getRepository(Deposit).save(deposit);
  }

  async remit(
    updateWithdrawInfo: UpdateWithRemitDto,
    user: number,
  ): Promise<any> {
    const { withdrawAmount, toAccountNumber, fromAccountNumber } =
      updateWithdrawInfo;
    // 해당 출금 계좌 정보 조회
    const fromAccount = await this.findByAccountNumber(fromAccountNumber);
    // 해딩 입금 계좌 정보 조회
    const toAccount = await this.findByAccountNumber(toAccountNumber);
    // 해당 출금 계좌 권한 조회
    const auth = await this.authCheck(fromAccount.id, user);
    // queryRunner 설정 -> 트랜잭션을 사용하는 방법 중 하나
    const queryRunner: QueryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      // 해당 출금 계좌 잔액 조회
      const exFromAccount: Account = await this.balanceCheck(
        queryRunner,
        fromAccount,
        withdrawAmount,
      );
      // 해당 입금 계좌 잔액 조회
      const exToAccount: Account = await this.balanceCheck(
        queryRunner,
        toAccount,
        withdrawAmount,
      );
      // 해당 출금 계좌 거래 가능 조회
      const amountAfterTransaction: number = await this.confirmTradable(
        exFromAccount,
        withdrawAmount,
      );
      // 출금 내역 생성 및 정산
      const withdraw = await this.withdraw(
        queryRunner,
        exFromAccount,
        withdrawAmount,
        amountAfterTransaction,
      );
      // 입금 내역 생성 및 정산
      const deposit = await this.deposit(
        queryRunner,
        exToAccount,
        withdrawAmount,
      );
      console.log(withdraw, deposit);
      this.interlink(queryRunner, withdraw, deposit);
      await queryRunner.commitTransaction();
    } catch (error) {
      console.error(error);
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
  //함수
}
