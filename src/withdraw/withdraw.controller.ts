import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UpdateWithDrawDto } from './dto/update.dto';
import { WithdrawService } from './withdraw.service';

@Controller('withdraw')
// @UseGuards(AuthGuard())
export class WithdrawController {
    constructor(private withDrawSeivce: WithdrawService) { }

    @Post('/')
    withdraw(@Body() updateWithDrawDto: UpdateWithDrawDto) {
        return this.withDrawSeivce.withdrawMe(updateWithDrawDto, 1);
    }
}

