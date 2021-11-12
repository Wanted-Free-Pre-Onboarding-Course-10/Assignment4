import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UpdateDepositDto } from './dto/update.dto'
import { DepositService } from './deposit.service';
import { AuthGuard } from '@nestjs/passport';
@Controller('deposit')
@UseGuards(AuthGuard())
export class DepositController {
    constructor(private depositService: DepositService) { }

    @Post('/')
    deposite(@Body() updateDepositDto: UpdateDepositDto) {
        //jwt 해석해서 userid 넘겨줘야함
        return this.depositService.depositMe(updateDepositDto, 1);
    }
}
