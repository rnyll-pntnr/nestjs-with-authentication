import { Document } from 'mongoose';

export interface Users extends Document {
  readonly name: string;
  readonly email: string;
  readonly password: string;
}
