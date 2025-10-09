import { IsInt, IsISBN, IsOptional, IsPositive } from 'class-validator';
import { CreateMaterialDto } from 'src/materials/dto/create-material.dto';

export class CreateBookDto extends CreateMaterialDto {
  @IsISBN(13)
  isbn13: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  edition: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  numberOfPages: number;
}
