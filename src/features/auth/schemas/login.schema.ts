import { emit } from 'node:cluster';
import {email, z} from 'zod';

export const loginSchema = z.object({
    email:z
    .string()
    .min(1 ,'the email must be obligatory ')
    .email('enter one email valid'),
    password:z
    .string()
    .min(1,'the password must be obligatory')
    .min(6,'the password must have at least 6 caracters')
}) ;

export type LoginFormData = z.infer<typeof loginSchema>;