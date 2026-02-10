import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type QuestionDocument = Question & Document;

class QuestionOption {
  @Prop({ required: true })
  index: number;

  @Prop({ required: true })
  text: string;
}

@Schema({ timestamps: true })
export class Question {
  @Prop({ required: true })
  statement: string;

  @Prop({ type: [QuestionOption], required: true })
  options: QuestionOption[];

  @Prop({ required: true })
  answerIndex: number;

  @Prop({ default: 'medium', enum: ['easy', 'medium', 'hard'] })
  difficulty: string;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
