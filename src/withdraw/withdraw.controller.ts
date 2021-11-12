import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UpdateWithDrawDto } from './dto/update.dto';
import { WithdrawService } from './withdraw.service';
import { IsPositive } from 'class-validator';

@Controller('withdraw')
@UseGuards(AuthGuard())
export class WithdrawController {
  constructor(private withDrawSeivce: WithdrawService) {}
  // TODO
  @IsPositive()
  @Post('/')
  withdraw(@Body() updateWithDrawDto: UpdateWithDrawDto, @Req() req) {
    return this.withDrawSeivce.withdrawMe(updateWithDrawDto, req.user.id);
  }
}
