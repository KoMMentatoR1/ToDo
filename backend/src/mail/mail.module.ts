import { Module } from '@nestjs/common';
import { MailService } from './mail.service';

@Module({
  providers: [MailService],
  imports: [],
  exports: [MailService],
})
export class MailModule {}
