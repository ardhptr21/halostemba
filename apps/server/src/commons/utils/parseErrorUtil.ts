import { ValidationError } from '@nestjs/common';

export default function parseErrorUtil(errors: ValidationError[]) {
  let result = {};

  for (const error of errors) {
    if (!error.children.length) {
      result = {
        ...result,
        [error.property]: error.constraints[Object.keys(error.constraints)[0]],
      };
    } else {
      result = {
        ...result,
        [error.property]: parseErrorUtil(error.children),
      };
    }
  }

  return result;
}
