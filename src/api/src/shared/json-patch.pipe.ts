import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { validate } from 'fast-json-patch';
import _ from 'lodash';

@Injectable()
export class JsonPatchPipe implements PipeTransform<any> {
  transform(value: any) {
    const errors = validate(value);
    if (!_.isEmpty(errors)) {
      throw new BadRequestException(errors.message);
    }

    return value;
  }
}
