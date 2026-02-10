"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrivialService = void 0;
const common_1 = require("@nestjs/common");
const questions_service_1 = require("../questions/questions.service");
const users_service_1 = require("../users/users.service");
let TrivialService = class TrivialService {
    constructor(questionsService, usersService) {
        this.questionsService = questionsService;
        this.usersService = usersService;
    }
    async getRandomQuestion(userId, difficulty) {
        const question = await this.questionsService.getRandomQuestion(difficulty);
        if (!question) {
            throw new common_1.NotFoundException('No hay preguntas disponibles');
        }
        const { answerIndex, ...questionWithoutAnswer } = question.toObject();
        return questionWithoutAnswer;
    }
    async submitAnswer(userId, submitAnswerDto) {
        const question = await this.questionsService.findOne(submitAnswerDto.questionId);
        if (!question) {
            throw new common_1.NotFoundException(`Pregunta con ID ${submitAnswerDto.questionId} no encontrada`);
        }
        if (submitAnswerDto.selectedOption < 0 || submitAnswerDto.selectedOption >= question.options.length) {
            throw new common_1.BadRequestException('Opción seleccionada no válida');
        }
        const correct = submitAnswerDto.selectedOption === question.answerIndex;
        await this.usersService.updateScore(userId, correct, submitAnswerDto.questionId, submitAnswerDto.selectedOption, question.answerIndex);
        const user = await this.usersService.findById(userId);
        if (!user) {
            throw new common_1.NotFoundException('Usuario no encontrado');
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
    async getScore(userId) {
        const user = await this.usersService.findById(userId);
        if (!user) {
            throw new common_1.NotFoundException('Usuario no encontrado');
        }
        return {
            totalAnswered: user.totalAnswered,
            correctAnswers: user.correctAnswers,
            incorrectAnswers: user.incorrectAnswers,
            percentage: user.totalAnswered > 0
                ? Math.round((user.correctAnswers / user.totalAnswered) * 100)
                : 0,
            lastAnswers: user.answerHistory.slice(-5).reverse(),
        };
    }
    async resetScore(userId) {
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
    async getHistory(userId) {
        const user = await this.usersService.findById(userId);
        if (!user) {
            throw new common_1.NotFoundException('Usuario no encontrado');
        }
        return {
            history: user.answerHistory.reverse(),
            totalAnswered: user.totalAnswered,
        };
    }
};
exports.TrivialService = TrivialService;
exports.TrivialService = TrivialService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [questions_service_1.QuestionsService,
        users_service_1.UsersService])
], TrivialService);
//# sourceMappingURL=trivial.service.js.map