import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { UpdateWithRemitDto } from './dto/update.dto';
import { RemittanceService } from './remittance.service';
import { AuthGuard } from '@nestjs/passport';
import { IsPositive } from 'class-validator';

@Controller('remittance')
@UseGuards(AuthGuard('jwt'))
export class RemittanceController {
  constructor(private remittanceService: RemittanceService) {}
  // TODO
  @IsPositive()
  @Post('/')
  withdraw(@Body() updateWithRemitDto: UpdateWithRemitDto, @Req() req) {
    return this.remittanceService.remit(updateWithRemitDto, req.user.id);
  }
}
