import { Document } from 'mongoose';
export type QuestionDocument = Question & Document;
declare class QuestionOption {
    index: number;
    text: string;
}
export declare class Question {
    statement: string;
    options: QuestionOption[];
    answerIndex: number;
    difficulty: string;
}
export declare const QuestionSchema: import("mongoose").Schema<Question, import("mongoose").Model<Question, any, any, any, Document<unknown, any, Question, any, {}> & Question & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Question, Document<unknown, {}, import("mongoose").FlatRecord<Question>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<Question> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export {};
