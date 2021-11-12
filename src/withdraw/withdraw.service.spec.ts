import { Test, TestingModule } from '@nestjs/testing';
import { WithdrawService } from './withdraw.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Deposit } from '../deposit/deposit.entity';
import { Balance } from '../balance/balance.entity';
import { Account } from '../account/account.entity';
import { Connection } from 'typeorm';

const mockRepository = {
  save: jest.fn(),
  findOne: jest.fn(),
};

const mockConnection = {
  transaction: jest.fn(),
};

describe('WithdrawService', () => {
  let service: WithdrawService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WithdrawService,
        {
          provide: getRepositoryToken(Deposit),
          useValue: mockRepository,
        },
        {
          provide: getRepositoryToken(Balance),
          useValue: mockRepository,
        },
        {
          provide: getRepositoryToken(Account),
          useValue: mockRepository,
        },
        {
          provide: Connection,
          useValue: mockConnection,
        },
      ],
    }).compile();

    service = module.get<WithdrawService>(WithdrawService);
  });

  it('인출 성공', async () => {
    //given
    //when
    //then
  });
});
