import { Column, Entity } from 'typeorm';

import { Base } from '../base.entity/base.entity';

@Entity()
export class Balance extends Base {
  @Column({ type: 'unsigned big int', nullable: false, name: 'balance' })
  balance: number;
}
