import { BeforeInsert, Column, Entity, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Base } from '../base.entity/base.entity';
import { Account } from 'src/account/account.entity';

@Entity()
export class User extends Base {
  @Column({ nullable: false, name: 'username', unique: true })
  username: string;

  @Column({ nullable: false, name: 'password' })
  password: string;

  @OneToMany(() => Account, (account) => account.user)
  accounts: Account[];

  @BeforeInsert()
  async setPassword(password: string) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password || this.password, salt);
  }
}
