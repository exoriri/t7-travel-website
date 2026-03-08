import * as zod from 'zod';
import { toTypedSchema } from '@vee-validate/zod';

export const useValidationSchema = () => {
  const validationSchema = toTypedSchema(
    zod.object({
      originCode: zod.string({ message: 'This field cannot be empty' }),
      destinationCode: zod.string({ message: 'This field cannot be empty' }),
      departureDate: zod.date({ message: 'This field cannot be empty' }),
    })
  );

  return validationSchema;
};
