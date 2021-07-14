import { DialogModelInterface } from './DialogModel';

import { model, Schema, Document } from 'mongoose';

export interface MessageModelInterface {
  text: string;
  dialog: DialogModelInterface | string;
  read: boolean;
}

export type MessageModelDocumentInterface = MessageModelInterface & Document;

const MessageSchema = new Schema<MessageModelDocumentInterface>(
  {
    text: { type: String, require: Boolean },
    dialog: { type: Schema.Types.ObjectId, ref: 'Dialog', require: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', require: true },
    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    usePushEach: true,
  },
);

export const MessageModel = model<MessageModelDocumentInterface>('Message', MessageSchema);
