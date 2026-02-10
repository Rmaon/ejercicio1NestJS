import { QuestionsService } from '../questions/questions.service';
import { UsersService } from '../users/users.service';
import { SubmitAnswerDto } from './dto/submit-answer.dto';
export declare class TrivialService {
    private questionsService;
    private usersService;
    constructor(questionsService: QuestionsService, usersService: UsersService);
    getRandomQuestion(userId: string, difficulty?: string): Promise<any>;
    submitAnswer(userId: string, submitAnswerDto: SubmitAnswerDto): Promise<{
        correct: boolean;
        correctOption: number;
        score: {
            totalAnswered: number;
            correctAnswers: number;
            percentage: number;
        };
    }>;
    getScore(userId: string): Promise<{
        totalAnswered: number;
        correctAnswers: number;
        incorrectAnswers: number;
        percentage: number;
        lastAnswers: {
            questionId: string;
            correct: boolean;
            selectedOption: number;
            correctOption: number;
            timestamp: Date;
        }[];
    }>;
    resetScore(userId: string): Promise<{
        message: string;
        score: {
            totalAnswered: number;
            correctAnswers: number;
            incorrectAnswers: number;
            percentage: number;
        };
    }>;
    getHistory(userId: string): Promise<{
        history: {
            questionId: string;
            correct: boolean;
            selectedOption: number;
            correctOption: number;
            timestamp: Date;
        }[];
        totalAnswered: number;
    }>;
}
