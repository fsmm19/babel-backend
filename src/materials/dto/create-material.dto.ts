import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { MaterialType } from 'src/generated/prisma/enums';
import { CreateAuthorDto } from '../authors/dto/create-author.dto';

export class CreateMaterialDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  subtitle?: string;

  @IsEnum(MaterialType)
  type: MaterialType;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateAuthorDto)
  authors: CreateAuthorDto[];
}
