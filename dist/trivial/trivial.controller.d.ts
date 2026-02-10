import { TrivialService } from './trivial.service';
import { SubmitAnswerDto } from './dto/submit-answer.dto';
export declare class TrivialController {
    private readonly trivialService;
    constructor(trivialService: TrivialService);
    getRandomQuestion(req: any, difficulty?: string): Promise<any>;
    submitAnswer(req: any, submitAnswerDto: SubmitAnswerDto): Promise<{
        correct: boolean;
        correctOption: number;
        score: {
            totalAnswered: number;
            correctAnswers: number;
            percentage: number;
        };
    }>;
    getScore(req: any): Promise<{
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
    resetScore(req: any): Promise<{
        message: string;
        score: {
            totalAnswered: number;
            correctAnswers: number;
            incorrectAnswers: number;
            percentage: number;
        };
    }>;
    getHistory(req: any): Promise<{
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
