
import { Body, Controller, Post, UseGuards, Req } from '@nestjs/common';
import { UpdateWithRemitDto } from './dto/update.dto';
import { RemittanceService } from './remittance.service';
import { AuthGuard } from '@nestjs/passport';
@Controller('remittance')
@UseGuards(AuthGuard())
export class RemittanceController {
    constructor(private remittanceService: RemittanceService) { }

    @Post('/')
    withdraw(@Body() updateWithRemitDto: UpdateWithRemitDto, @Req() req) {
        return this.remittanceService.remit(updateWithRemitDto, req.user.id);
    }

}

