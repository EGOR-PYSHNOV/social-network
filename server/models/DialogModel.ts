import { UserModelInterface } from './UserModel';

import { model, Schema, Document } from 'mongoose';

export interface DialogModelInterface {
  partner: UserModelInterface | string;
  author: UserModelInterface | string;
  lastMessage: string;
  newMessages: {
    count: number;
    user: UserModelInterface;
  };
}

export type DialogModelDocumentInterface = DialogModelInterface & Document;

const DialogSchema = new Schema<DialogModelDocumentInterface>(
  {
    partner: { type: Schema.Types.ObjectId, ref: 'User' },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    lastMessage: { type: Schema.Types.ObjectId, ref: 'Message' },
    newMessages: {
      count: { type: Number, default: 0 },
      user: { type: Schema.Types.ObjectId, ref: 'User' },
    },
  },
  {
    timestamps: true,
  },
);

export const DialogModel = model<DialogModelDocumentInterface>('Dialog', DialogSchema);
