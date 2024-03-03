import { Schema, model } from 'mongoose';
import { Users } from './users.interface';

const UsersSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: () => new Date(),
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_doc, ret) => {
        ret._id = ret._id.toString();
        delete ret.__v;
      },
    },
  },
);

const UsersModel = model<Users>('Users', UsersSchema);

export default UsersModel;
