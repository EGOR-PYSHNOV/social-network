import { UserModelDocumentInterface } from './UserModel';
import { model, Schema, Document } from 'mongoose';

interface PostCommentInterface {
  user: UserModelDocumentInterface;
  text: string;
}

export interface PostModelInterface {
  _id?: string;
  text: string;
  user: UserModelDocumentInterface;
  images?: string[];
  likes?: UserModelDocumentInterface[];
  comments?: PostCommentInterface[];
}

export type PostModelDocumentInterface = PostModelInterface & Document;

const PostSchema = new Schema<PostModelDocumentInterface>(
  {
    text: {
      required: true,
      type: String,
      maxlength: 280,
    },
    images: [
      {
        type: String,
      },
    ],
    user: {
      required: true,
      ref: 'User',
      type: Schema.Types.ObjectId,
    },
    likes: [
      {
        ref: 'User',
        type: Schema.Types.ObjectId,
      },
    ],
    comments: [
      {
        user: {
          ref: 'User',
          type: Schema.Types.ObjectId,
        },
        text: {
          type: String,
          maxlength: 280,
        },
        date: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true },
);

export const PostModel = model<PostModelDocumentInterface>('Post', PostSchema);
