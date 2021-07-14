import { UserModel, UserModelDocumentInterface } from './../models/UserModel';
import express from 'express';

export const updateLastSeen = async (
  req: express.Request,
  _: express.Response,
  next: express.NextFunction,
) => {
  if (req.user) {
    const user = req.user as UserModelDocumentInterface;

    if (user) {
      await UserModel.findOneAndUpdate(
        { _id: user._id },
        {
          last_seen: new Date(),
        },
        { new: true },
      );
    }
  }
  next();
};
