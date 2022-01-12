import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

import { SnsAwsService } from './services/sns-aws/sns-aws.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly sns: SnsAwsService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
