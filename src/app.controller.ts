import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('app')
export class AppController {
  constructor(private appService: AppService) {}

  @Get()
  async getSeedDatas(): Promise<string> {
    return await this.appService.getSeedDatas();
  }
}
