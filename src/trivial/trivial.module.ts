import { Module } from '@nestjs/common';
import { TrivialService } from './trivial.service';
import { TrivialController } from './trivial.controller';
import { QuestionsModule } from '../questions/questions.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [QuestionsModule, UsersModule],
  controllers: [TrivialController],
  providers: [TrivialService],
})
export class TrivialModule {}
