import { Type } from 'class-transformer';
import {
  IsDate,
  IsDateString,
  IsISO31661Alpha3,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUppercase,
} from 'class-validator';

export class CreateAuthorDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  middleName?: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsISO31661Alpha3()
  @IsUppercase()
  nationality?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  birthDate?: Date;
}
