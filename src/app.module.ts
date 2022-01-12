import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SnsAwsService } from './services/sns-aws/sns-aws.service';
import { LeadsService } from './services/mautic/leads/leads.service';
import { MauticController } from './controllers/mautic/mautic.controller';
import { HttpModule } from '@nestjs/axios';
import { SendAwsController } from './controllers/send-aws/send-aws.controller';

@Module({
  imports: [HttpModule],
  controllers: [AppController, MauticController, SendAwsController],
  providers: [AppService, SnsAwsService, LeadsService],
})
export class AppModule {}
