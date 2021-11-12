
import { Body, Controller, Post } from '@nestjs/common';
import { UpdateWithRemitDto } from './dto/update.dto';
import { RemittanceService } from './remittance.service';
@Controller('remittance')
export class RemittanceController {
    constructor(private remittanceService: RemittanceService) { }

    @Post('/')
    withdraw(@Body() updateWithRemitDto: UpdateWithRemitDto) {
        return this.remittanceService.remit(updateWithRemitDto, 2);
    }

}

