import { Body, Controller, Post, Put, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from './dto/user.dto';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Post('/signup')
    signUp(@Body(ValidationPipe) userDto: UserDto): Promise<string> {
        return this.userService.signUp(userDto);
    }

    @Put('/signin')
    signIn(@Body(ValidationPipe) userDto: UserDto): Promise<string> {
        return this.userService.signIn(userDto);
    }

    @Post('/test')
    @UseGuards(AuthGuard())
    test(@GetUser() user: User) {
        console.log('user', user);
    }
}
