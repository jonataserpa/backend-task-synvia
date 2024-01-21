import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import constants from 'src/config/constants';

export class UserCreateDto {
  @ApiProperty()
  id: number;

  @ApiProperty({
    description: 'Name default data perfil',
    example: 'Jonata',
  })
  @Length(constants.STRING_MIN, constants.STRING_MAX)
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Email default login',
    example: 'jonata@gmail.com',
  })
  @Length(constants.STRING_MIN, constants.STRING_MAX)
  @IsString()
  email: string;

  @ApiProperty({
    description: 'Phone default user',
    example: '(35)9.9743-3853',
  })
  @Length(constants.NUMBER_MIN_PHONE)
  @IsString()
  phone: string;

  @ApiProperty({
    description: 'Data born',
    example: '2022-08-13T16:05:29.000Z',
  })
  @IsString()
  dateborn: string;

  @ApiProperty({
    description: 'Type gender',
    example: 'male',
  })
  @IsString()
  radiogender: string;
}
