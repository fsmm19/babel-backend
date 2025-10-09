import { Injectable, PipeTransform } from '@nestjs/common';

import { normalize } from '../utils/normalize-name.util';

@Injectable()
export class NormalizeNamesPipe implements PipeTransform {
  transform(value: any) {
    if (value && value instanceof Object) {
      const nameFields = ['firstName', 'middleName', 'lastName'];

      nameFields.forEach((field) => {
        if (Object.keys(value).includes(field)) {
          value[field] = normalize(value[field]);
        }
      });
    }
    return value;
  }
}
