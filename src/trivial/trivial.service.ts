import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { QuestionsService } from '../questions/questions.service';
import { UsersService } from '../users/users.service';
import { SubmitAnswerDto } from './dto/submit-answer.dto';

@Injectable()
export class TrivialService {
  constructor(
    private questionsService: QuestionsService,
    private usersService: UsersService,
  ) {}

  async getRandomQuestion(userId: string, difficulty?: string) {
    const question = await this.questionsService.getRandomQuestion(difficulty);
    
    if (!question) {
      throw new NotFoundException('No hay preguntas disponibles');
    }

    // No devolvemos el answerIndex al usuario
    const { answerIndex, ...questionWithoutAnswer } = question.toObject();
    
    return questionWithoutAnswer;
  }

  async submitAnswer(userId: string, submitAnswerDto: SubmitAnswerDto) {
    const question = await this.questionsService.findOne(submitAnswerDto.questionId);

    if (!question) {
      throw new NotFoundException(`Pregunta con ID ${submitAnswerDto.questionId} no encontrada`);
    }

    // Validar que la opción sea válida
    if (submitAnswerDto.selectedOption < 0 || submitAnswerDto.selectedOption >= question.options.length) {
      throw new BadRequestException('Opción seleccionada no válida');
    }

    const correct = submitAnswerDto.selectedOption === question.answerIndex;

    // Actualizar puntuación del usuario
    await this.usersService.updateScore(
      userId,
      correct,
      submitAnswerDto.questionId,
      submitAnswerDto.selectedOption,
      question.answerIndex,
    );

    // Obtener la puntuación actualizada
    const user = await this.usersService.findById(userId);

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return {
      correct,
      correctOption: question.answerIndex,
      score: {
        totalAnswered: user.totalAnswered,
        correctAnswers: user.correctAnswers,
        percentage: user.totalAnswered > 0 
          ? Math.round((user.correctAnswers / user.totalAnswered) * 100) 
          : 0,
      },
    };
  }

  async getScore(userId: string) {
    const user = await this.usersService.findById(userId);

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return {
      totalAnswered: user.totalAnswered,
      correctAnswers: user.correctAnswers,
      incorrectAnswers: user.incorrectAnswers,
      percentage: user.totalAnswered > 0 
        ? Math.round((user.correctAnswers / user.totalAnswered) * 100) 
        : 0,
      lastAnswers: user.answerHistory.slice(-5).reverse(), // Últimas 5 respuestas
    };
  }

  async resetScore(userId: string) {
    await this.usersService.resetScore(userId);

    return {
      message: 'Puntuación reiniciada exitosamente',
      score: {
        totalAnswered: 0,
        correctAnswers: 0,
        incorrectAnswers: 0,
        percentage: 0,
      },
    };
  }

  async getHistory(userId: string) {
    const user = await this.usersService.findById(userId);

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return {
      history: user.answerHistory.reverse(), // Más recientes primero
      totalAnswered: user.totalAnswered,
    };
  }
}
