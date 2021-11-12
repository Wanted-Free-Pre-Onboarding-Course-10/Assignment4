import { Body, Controller, Get, Post } from '@nestjs/common';
import { UpdateDepositDto } from './dto/update.dto'
import { DepositService } from './deposit.service';
@Controller('deposit')
export class DepositController {
    constructor(private depositService: DepositService) { }

    @Post('/')
    deposite(@Body() updateDepositDto: UpdateDepositDto) {
        //jwt 해석해서 userid 넘겨줘야함
        return this.depositService.deposit(updateDepositDto, 1);
    }
}
