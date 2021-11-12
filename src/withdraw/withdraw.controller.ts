import { Body, Controller, Post } from '@nestjs/common';
import { UpdateWithDrawDto } from './dto/update.dto';
import { WithdrawService } from './withdraw.service';

@Controller('withdraw')
export class WithdrawController {
    constructor(private withDrawSeivce: WithdrawService) { }

    @Post('/')
    withdraw(@Body() updateWithDrawDto: UpdateWithDrawDto) {
        return this.withDrawSeivce.withdrawMe(updateWithDrawDto, 1);
    }
}

