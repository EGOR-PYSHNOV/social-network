import { MessageModel, MessageModelDocumentInterface } from './../models/MessageModel';
import socket from 'socket.io';
import express from 'express';

import { UserModelDocumentInterface } from '../models/UserModel';
import { DialogModel } from '../models/DialogModel';

class MessageController {
  io: socket.Server;
  constructor(io: socket.Server) {
    this.io = io;
  }
  async index(req: express.Request, res: express.Response): Promise<void> {
    try {
      const user = req.user as UserModelDocumentInterface;
      const dialogId: string = req.query.dialog as string;

      if (user) {
        await MessageModel.updateMany(
          { dialog: dialogId, user: { $ne: user._id } },
          { $set: { read: true } },
          null,
          (err: any): void => {
            if (err) {
              res.status(500).json({
                status: 'error',
                message: err,
              });
            } else {
              this.io.emit('SERVER:MESSAGES_READED', dialogId);
            }
          },
        );

        await DialogModel.findOneAndUpdate(
          { _id: dialogId },
          {
            newMessages: {
              count: 0,
              user: user._id,
            },
          },
          { upsert: true },
        );

        const messages = await MessageModel.find({ dialog: dialogId })
          .populate('user', 'fullname avatar isOnline')
          .exec();

        if (messages.length === 0) {
          res.status(404).json({
            status: 'error',
            message: 'Messages not found',
          });
          return;
        }

        res.json({
          status: 'success',
          data: messages,
        });
      } else {
        res.status(404).send();
      }
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error,
      });
    }
  }

  async create(req: express.Request, res: express.Response): Promise<void> {
    try {
      const user = req.user as UserModelDocumentInterface;

      if (user) {
        const messageData = {
          text: req.body.text,
          dialog: req.body.dialog_id,
          user: user._id,
        };

        const message = await MessageModel.create(messageData);

        await MessageModel.updateMany(
          { dialog: req.body.dialog_id, user: { $ne: user._id } },
          { $set: { read: true } },
        );

        const dialog = await DialogModel.findOne({ _id: req.body.dialog_id });

        if (dialog) {
          if (String(dialog.newMessages.user._id) !== String(user._id)) {
            await DialogModel.updateOne(
              { _id: req.body.dialog_id },
              {
                newMessages: {
                  count: 1,
                  user: user._id,
                },
              },
            );
          } else {
            await DialogModel.updateOne(
              { _id: req.body.dialog_id },
              {
                newMessages: {
                  count: dialog.newMessages.count + 1,
                  user: user.id,
                },
              },
            );
          }
          dialog.save();
        }

        message.save().then((obj: MessageModelDocumentInterface) => {
          obj.populate(
            {
              path: 'dialog user',
              select: 'author partner',
              populate: {
                path: 'author partner',
                select: '_id',
              },
            },
            async (err: any, message: MessageModelDocumentInterface) => {
              if (err) {
                return res.status(500).json({
                  status: 'error',
                  message: err,
                });
              }

              await DialogModel.findOneAndUpdate(
                { _id: messageData.dialog },
                { lastMessage: message._id },
                { upsert: true },
                function (err) {
                  if (err) {
                    return res.status(500).json({
                      status: 'error',
                      message: err,
                    });
                  }
                },
              );

              res.json({
                status: 'success',
                data: message,
              });

              this.io.emit('SERVER:NEW_MESSAGE', message);
            },
          );
        });
      } else {
        res.status(404).send();
      }
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error,
      });
    }
  }
}

export default MessageController;
