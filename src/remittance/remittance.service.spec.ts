import { Test, TestingModule } from '@nestjs/testing';
import { RemittanceService } from './remittance.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Deposit } from '../deposit/deposit.entity';
import { Balance } from '../balance/balance.entity';
import { Account } from '../account/account.entity';
import { Withdraw } from '../withdraw/withdraw.entity';
import { Connection } from 'typeorm';

const mockRepository = {
  save: jest.fn(),
  findOne: jest.fn(),
};

const mockConnection = {
  transaction: jest.fn(),
};

describe('RemittanceService', () => {
  let service: RemittanceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RemittanceService,
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
          provide: getRepositoryToken(Withdraw),
          useValue: mockRepository,
        },
        {
          provide: Connection,
          useValue: mockConnection,
        },
      ],
    }).compile();

    service = module.get<RemittanceService>(RemittanceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
