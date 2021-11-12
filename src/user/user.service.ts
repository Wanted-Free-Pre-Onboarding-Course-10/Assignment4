import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from './dto/user.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
    ) { }

    // == 회원가입 == //
    async signUp(userDto: UserDto): Promise<void> {
        return await this.userRepository.createUser(userDto);
    }


    // == 로그인 == //
    async signIn(userDto: UserDto): Promise<{ accessToken: string }> {
        const { username, password } = userDto;

        const user = await this.userRepository.findOne({ username });

        if (user && await bcrypt.compare(password, user.password)) {
            const payload = { username };
            const accessToken = await this.jwtService.sign(payload);

            return { accessToken };
        }
        else throw new UnauthorizedException('login Falied');
    }
}
