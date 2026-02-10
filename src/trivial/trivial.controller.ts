import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { TrivialService } from './trivial.service';
import { SubmitAnswerDto } from './dto/submit-answer.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('trivial')
@UseGuards(JwtAuthGuard)
export class TrivialController {
  constructor(private readonly trivialService: TrivialService) {}

  @Get('question')
  getRandomQuestion(
    @Request() req,
    @Query('difficulty') difficulty?: string,
  ) {
    return this.trivialService.getRandomQuestion(req.user.userId, difficulty);
  }

  @Post('answer')
  submitAnswer(@Request() req, @Body() submitAnswerDto: SubmitAnswerDto) {
    return this.trivialService.submitAnswer(req.user.userId, submitAnswerDto);
  }

  @Get('score')
  getScore(@Request() req) {
    return this.trivialService.getScore(req.user.userId);
  }

  @Post('reset')
  resetScore(@Request() req) {
    return this.trivialService.resetScore(req.user.userId);
  }

  @Get('history')
  getHistory(@Request() req) {
    return this.trivialService.getHistory(req.user.userId);
  }
}
