import {ZodRawShape} from 'zod';
import {ZodString} from 'zod/lib/types';

export interface IAuthUserCredentialsShape extends ZodRawShape {
  email: ZodString;
  password: ZodString;
}
