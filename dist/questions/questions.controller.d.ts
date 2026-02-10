import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
export declare class QuestionsController {
    private readonly questionsService;
    constructor(questionsService: QuestionsService);
    create(createQuestionDto: CreateQuestionDto): Promise<import("./schemas/question.schema").Question>;
    findAll(difficulty?: string): Promise<import("./schemas/question.schema").Question[]>;
    findOne(id: string): Promise<import("./schemas/question.schema").Question>;
    update(id: string, updateQuestionDto: UpdateQuestionDto): Promise<import("./schemas/question.schema").Question>;
    remove(id: string): Promise<void>;
}
