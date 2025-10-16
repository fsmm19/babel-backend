import { IsOptional, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateAuthorDto } from './create-author.dto';

export class ConnectOrCreateAuthorDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateAuthorDto)
  data?: CreateAuthorDto;
}
