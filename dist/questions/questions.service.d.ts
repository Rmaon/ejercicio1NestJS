import { OnModuleInit } from '@nestjs/common';
import { Model } from 'mongoose';
import { Question, QuestionDocument } from './schemas/question.schema';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
export declare class QuestionsService implements OnModuleInit {
    private questionModel;
    constructor(questionModel: Model<QuestionDocument>);
    onModuleInit(): Promise<void>;
    private seedQuestions;
    create(createQuestionDto: CreateQuestionDto): Promise<Question>;
    findAll(difficulty?: string): Promise<Question[]>;
    findOne(id: string): Promise<Question>;
    update(id: string, updateQuestionDto: UpdateQuestionDto): Promise<Question>;
    remove(id: string): Promise<void>;
    getRandomQuestion(difficulty?: string): Promise<QuestionDocument>;
}
