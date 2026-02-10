import { IsString, IsNotEmpty, IsInt, Min, Max } from 'class-validator';

export class SubmitAnswerDto {
  @IsString()
  @IsNotEmpty({ message: 'El ID de la pregunta es obligatorio' })
  questionId: string;

  @IsInt()
  @Min(0)
  @Max(3)
  selectedOption: number;
}
