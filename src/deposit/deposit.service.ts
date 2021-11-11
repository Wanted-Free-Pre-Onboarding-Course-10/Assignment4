import { Injectable, NotFoundException, } from '@nestjs/common';
import { Connection, Repository } from "typeorm";
import { InjectRepository } from '@nestjs/typeorm';
import { Balance } from "../balance/balance.entity";
import { Deposit } from "../deposit/deposit.entity";
import { Account } from "../account/account.entity";
import { User } from "../user/user.entity";

export class DepositService {


    constructor(
        @InjectRepository(Deposit) private depositRepository: Repository<Deposit>,
        @InjectRepository(Balance) private balanceRepository: Repository<Balance>,
        @InjectRepository(Account) private accountRepository: Repository<Account>,
        private connection: Connection,
    ) { }

    async findByAccountNumber(accountNumber: String): Promise<any> {
        return await this.accountRepository.findOne({
            where: { accountNumber }
        })
    }

    async authCheck(accountId: Number, userId: Number): Promise<any> {
        return await this.accountRepository
            .findOne({
                where: { id: accountId, user: { id: userId } },
                relations: ['user']
            });
    }

    async update(updateQuestionInfo, user) {
        const { depositAmount, accountNumber } = updateQuestionInfo;

        // 해당 계좌 정보 조회
        const account = await this.findByAccountNumber(accountNumber);
        if (account === undefined) {
            throw new Error("The account doesn't exist.");
        }
        // 권한 조회
        const auth = await this.authCheck(account.id, user);
        if (auth === undefined) {
            throw new Error("You don't have edit permission");
        }
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            // 잔액 조회
            const nowBalance = await queryRunner.manager
                .getRepository(Balance)
                .findOne({ where: { account } });
            // 입금 내역 생성
            const newBalance = nowBalance.balance + depositAmount
            const deposit = await queryRunner.manager
                .getRepository(Deposit)
                .save({ accountId: account.id, oldBalance: nowBalance.balance, newBalance: newBalance, amount: depositAmount })
            await queryRunner.commitTransaction();
        } catch (error) {
            console.error(error);
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }
}
