import { DialogModelDocumentInterface } from './DialogModel';
import { differenceInMinutes } from 'date-fns';
import { model, Schema, Document } from 'mongoose';
export interface UserModelInterface {
  _id?: string;
  email: string;
  fullname: string;
  username: string;
  password: string;
  confirmHash: string;
  confirmed?: boolean;
  location?: string;
  avatar?: string;
  about?: string;
  last_seen?: Date;
  dialogs?: DialogModelDocumentInterface;
}

export type UserModelDocumentInterface = UserModelInterface & Document;

const UserSchema = new Schema<UserModelDocumentInterface>(
  {
    email: {
      unique: true,
      required: true,
      type: String,
    },
    fullname: {
      required: true,
      type: String,
    },
    username: {
      unique: true,
      required: true,
      type: String,
    },
    password: {
      required: true,
      type: String,
    },
    confirmHash: {
      required: true,
      type: String,
    },
    confirmed: {
      type: Boolean,
      default: false,
    },
    last_seen: {
      type: Date,
      default: new Date(),
    },
    dialogs: [
      {
        ref: 'Dialog',
        type: Schema.Types.ObjectId,
      },
    ],
    location: String,
    avatar: String,
    about: String,
  },
  { timestamps: true },
);

UserSchema.virtual('isOnline').get(function (this: any) {
  return differenceInMinutes(new Date(), this.last_seen) < 5;
});

UserSchema.set('toJSON', {
  virtuals: true,
  transform: function (_: never, obj: any) {
    delete obj.password;
    delete obj.confirmHash;
    return obj;
  },
});

export const UserModel = model<UserModelDocumentInterface>('User', UserSchema);
