import { ZodType, z } from 'zod';

export class UserValidation {
  static readonly LOGIN: ZodType = z
    .object({
      email: z.string().email().min(1),
      password: z.string().min(1),
    })
    .required();

  static readonly REGISTER: ZodType = z
    .object({
      name: z.string().min(1).max(100),
      email: z.string().email().min(1),
      password: z.string().min(1).max(100),
      role_id: z.number(),
      timeStamp: z.string().transform((val) => new Date(val)),
    })
    .required();
}
