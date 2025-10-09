import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class NotEmptyBodyPipe implements PipeTransform {
  transform(value: any) {
    if (!value || Object.keys(value).length === 0) {
      throw new BadRequestException('The body must contain at least one field');
    }
    return value;
  }
}
