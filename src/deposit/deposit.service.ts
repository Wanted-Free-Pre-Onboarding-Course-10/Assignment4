import { Injectable, NotFoundException, } from '@nestjs/common';
import { Connection, Repository } from "typeorm";
import { DEPOSIT_SUCCESS_MSG } from "../message/message"
import { INVALID_REQUEST } from "../message/message"
import { InjectRepository } from '@nestjs/typeorm';
import { Balance } from "../balance/balance.entity";
import { Deposit } from "../deposit/deposit.entity";
import { Account } from "../account/account.entity";
import { Withdraw } from "../withdraw/withdraw.entity";
import { User } from "../user/user.entity";
import { RemittanceService } from "../remittance/remittance.service"
export class DepositService extends RemittanceService {
    constructor(@InjectRepository(Deposit) protected depositRepository: Repository<Deposit>,
        @InjectRepository(Balance) protected balanceRepository: Repository<Balance>,
        @InjectRepository(Account) protected accountRepository: Repository<Account>,
        @InjectRepository(Withdraw) protected withdrawRepositry: Repository<Withdraw>,
        protected connection: Connection) {
        super(depositRepository, balanceRepository, accountRepository, withdrawRepositry, connection);
    }
    // 자기 계좌 입금
    async depositMe(updateDepositInfo, user) {
        const { depositAmount, accountNumber } = updateDepositInfo;
        if (depositAmount <= 0)
            return INVALID_REQUEST;
        console.log(depositAmount, accountNumber);
        // 해당 계좌 정보 조회
        const account = await this.findByAccountNumber(accountNumber);
        // 권한 조회
        const auth = await this.authCheck(account.id, user);
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            // 잔액 조회
            const exAccount = await this.balanceCheck(queryRunner, account, depositAmount)
            // 입금 내역 생성 및 정산
            const depositData: Deposit = await this.deposit(queryRunner, exAccount, depositAmount)
            await queryRunner.commitTransaction();
            return DEPOSIT_SUCCESS_MSG(accountNumber, depositAmount, depositData.newBalance);
        } catch (error) {
            console.error(error);
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }
}
