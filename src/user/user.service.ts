import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from './dto/user.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LOGIN_SUCCESS_MSG } from "../message/message";
import { LoginFailException } from 'src/exception/login_fail_exception';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
    ) { }

    // == 회원가입 == //
    async signUp(userDto: UserDto): Promise<string> {
        return await this.userRepository.createUser(userDto);
    }


    // == 로그인 == //
    async signIn(userDto: UserDto): Promise<{accessToken:string}> {
        const { username, password } = userDto;

        const user = await this.userRepository.findOne({ username });

        if (user && await bcrypt.compare(password, user.password)) {
            const payload = { username };
            const accessToken = await this.jwtService.sign(payload);

            return {accessToken}
        }
        else throw new LoginFailException();
    }
}
