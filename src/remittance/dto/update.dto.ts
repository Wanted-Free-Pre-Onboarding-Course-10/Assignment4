import { IsPositive } from 'class-validator';

export class UpdateWithRemitDto {
  @IsPositive()
  withdrawAmount: number;

  toAccountNumber: string;

  fromAccountNumber: string;
}
