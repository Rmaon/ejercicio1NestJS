declare class QuestionOptionDto {
    index: number;
    text: string;
}
export declare class CreateQuestionDto {
    statement: string;
    options: QuestionOptionDto[];
    answerIndex: number;
    difficulty?: string;
}
export {};
