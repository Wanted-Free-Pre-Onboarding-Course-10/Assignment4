import { Test, TestingModule } from '@nestjs/testing';
import { DepositService } from './deposit.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Deposit } from './deposit.entity';
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

describe('DepositService', () => {
  let service: DepositService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DepositService,
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

    service = module.get<DepositService>(DepositService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
