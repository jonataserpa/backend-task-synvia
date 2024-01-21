import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Length } from 'class-validator';
import constants from 'src/config/constants';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Task title',
    example: 'Task title test',
  })
  @Length(constants.STRING_MIN, constants.STRING_MAX)
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Task description',
    example: 'Task description example',
  })
  @Length(constants.STRING_MIN, constants.STRING_MAX)
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Task number',
    example: 1,
  })
  @IsNumber()
  userId: number;
}
