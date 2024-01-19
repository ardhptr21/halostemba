import { ValidationArguments } from 'class-validator';

export const validator = {
  isNotEmpty: '$property tidak boleh kosong',
  isString: '$property harus berupa string',
  isBoolean: '$property harus berupa boolean',
  isEmail: '$property harus berupa email yang valid',
  isInt: '$property harus berupa integer',
  isEnum: '$property harus salah satu diantara: $2',
  minLength: '$property minimal $1 karakter',
  length: '$property harus $1 karakter',
  isUrl: '$property harus berupa url',
  maxLength: '$property maksimal $1 karakter',
  isUUID: '$property harus berupa UUID',
  isArray: '$property harus berupa array',
  arrayMaxSize: 'data pada $property tidak lebih dari $1 data',
};

export const validatorMapper =
  (type: keyof typeof validator) =>
  ({ property, constraints }: ValidationArguments): string => {
    let message = validator[type].replace('$property', property);

    constraints?.forEach((constraint, index) => {
      message = message.replace(`$${index + 1}`, constraint);
    });

    return message;
  };
