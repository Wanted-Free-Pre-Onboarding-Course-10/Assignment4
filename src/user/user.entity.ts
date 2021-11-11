import {
    BeforeInsert, Column,
    Entity,
    OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { IsNotEmpty, IsString, Length } from 'class-validator';
import { Base } from '../base.entity/base.entity';
import { Account } from 'src/account/account.entity';
@Entity()
export class User extends Base {

    @IsNotEmpty()
    @IsString()
    @Length(5, 50)
    @Column({ unique: true })
    username: string;

    @IsNotEmpty()
    @IsString()
    @Length(5, 50)
    @Column()
    password: string;

    @OneToMany(() => Account, account => account.userId)
    accounts: Account[];

    @BeforeInsert()
    async setPassword(password: string) {
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(password || this.password, salt);
    }
}