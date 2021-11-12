import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { UpdateDepositDto } from './dto/update.dto';
import { DepositService } from './deposit.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('deposit')
@UseGuards(AuthGuard())
export class DepositController {
  constructor(private depositService: DepositService) {}

  // TODO
  @Post('/')
  deposite(@Body() updateDepositDto: UpdateDepositDto, @Req() req) {
    return this.depositService.depositMe(updateDepositDto, req.user.id);
  }
}
