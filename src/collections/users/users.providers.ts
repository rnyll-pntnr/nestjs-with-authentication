import { Mongoose, model } from 'mongoose';
import UsersModel from './schemas/users.schema';

export const usersProviders = [
  {
    provide: 'USERS_MODEL',
    useFactory: (mongoose: Mongoose) => UsersModel,
    inject: ['DATABASE_CONNECTION'],
  },
];
