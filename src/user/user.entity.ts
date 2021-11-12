import { BeforeInsert, Column, Entity, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Base } from '../base.entity/base.entity';
import { Account } from 'src/account/account.entity';
@Entity()
export class User extends Base {
  @Column({ unique: true, nullable: false, name: 'username' })
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
