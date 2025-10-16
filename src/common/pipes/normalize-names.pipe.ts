import { Injectable, PipeTransform } from '@nestjs/common';

import { normalize } from '../utils/normalize-name.util';

@Injectable()
export class NormalizeNamesPipe implements PipeTransform {
  transform(value: any) {
    const nameFields = ['firstName', 'middleName', 'lastName'];

    const normalizeObject = (object: any) => {
      if (object && typeof object === 'object' && !Array.isArray(object)) {
        nameFields.forEach((field) => {
          if (Object.prototype.hasOwnProperty.call(object, field)) {
            object[field] = normalize(object[field]);
          }
        });
      }
      return object;
    };

    if (Array.isArray(value)) {
      return value.map((item) =>
        typeof item === 'object' ? normalizeObject(item) : item,
      );
    }

    if (value && typeof value === 'object') {
      return normalizeObject(value);
    }

    return value;
  }
}
