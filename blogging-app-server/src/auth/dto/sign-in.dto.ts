import { OmitType } from '@nestjs/mapped-types';
import { CreateAuthDto } from './create-auth.dto';

export class SignInDto extends OmitType(CreateAuthDto, ['username'] as const) {}
