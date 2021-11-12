import { Injectable, NotFoundException, } from '@nestjs/common';
import { Connection, Repository } from "typeorm";
import { UpdateWithDrawDto } from "../withdraw/dto/update.dto";
import { InjectRepository } from '@nestjs/typeorm';
import { Balance } from "../balance/balance.entity";
import { Deposit } from "../deposit/deposit.entity";
import { Account } from "../account/account.entity";
import { Withdraw } from './withdraw.entity';

@Injectable()
export class WithdrawService {

    constructor(
        @InjectRepository(Deposit) private depositRepository: Repository<Deposit>,
        @InjectRepository(Balance) private balanceRepository: Repository<Balance>,
        @InjectRepository(Account) private accountRepository: Repository<Account>,
        private connection: Connection,
    ) { }

    async findByAccountNumber(accountNumber: string): Promise<any> {
        return await this.accountRepository
            .findOne({
                where: { accountNumber: accountNumber }
            })
    }

    async authCheck(accountId: number, userId: number): Promise<any> {
        return await this.accountRepository
            .findOne({
                where: { id: accountId, user: { id: userId } },
                relations: ['user']
            });
    }

    async withdraw(updateWithdrawInfo: UpdateWithDrawDto, user: number): Promise<any> {
        const { withdrawAmount, accountNumber } = updateWithdrawInfo;
        console.log(withdrawAmount, accountNumber);
        // 해당 계좌 정보 조회
        console.log("계좌번호로 해당 계좌 정보 조회-");
        const account = await this.findByAccountNumber(accountNumber);
        console.log(account);
        if (account === undefined) {
            throw new Error("The account doesn't exist.");
        }

        // // 권한 조회
        const auth = await this.authCheck(account.id, user);
        console.log(auth)
        if (auth === undefined) {
            throw new Error("You don't have edit permission");
        }
        console.log(auth);
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            // 잔액 조회
            console.log(account.id);
            const exAccount = await queryRunner.manager
                .getRepository(Account)
                .findOne({
                    where: { id: account.id },
                    relations: ['balance']
                });
            console.log(exAccount.balance.balance, withdrawAmount);
            const amountAfterTransaction = exAccount.balance.balance - withdrawAmount;
            console.log(amountAfterTransaction);
            // 현재 잔액 - 출금액
            if (amountAfterTransaction < 0)
                throw Error("잔액이 부족합니다");
            // 출금 내역 생성
            const oldBalance: number = exAccount.balance.balance;
            const newBalance: number = amountAfterTransaction;
            const withdrawInfo = { account: account, oldBalance: oldBalance, newBalance: newBalance, amount: withdrawAmount }
            const deposit = await queryRunner.manager
                .getRepository(Withdraw)
                .save(withdrawInfo);
            //잔액 수정
            exAccount.balance.balance = newBalance;
            const updateBalance = await queryRunner.manager
                .getRepository(Balance)
                .save(exAccount.balance);
            console.log(exAccount);
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


