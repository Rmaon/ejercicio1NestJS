import { IsString, IsNotEmpty, IsArray, ArrayMinSize, ValidateNested, IsInt, Min, Max, IsEnum, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

class QuestionOptionDto {
  @IsInt()
  @Min(0)
  @Max(3)
  index: number;

  @IsString()
  @IsNotEmpty()
  text: string;
}

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty({ message: 'El enunciado es obligatorio' })
  statement: string;

  @IsArray()
  @ArrayMinSize(2, { message: 'Debe haber al menos 2 opciones' })
  @ValidateNested({ each: true })
  @Type(() => QuestionOptionDto)
  options: QuestionOptionDto[];

  @IsInt()
  @Min(0)
  @Max(3)
  answerIndex: number;

  @IsOptional()
  @IsEnum(['easy', 'medium', 'hard'])
  difficulty?: string;
}
