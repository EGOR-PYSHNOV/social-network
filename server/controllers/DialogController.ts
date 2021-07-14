import { UserModel } from './../models/UserModel';
import { MessageModel } from './../models/MessageModel';
import { DialogModel } from './../models/DialogModel';
import socket from 'socket.io';
import express from 'express';
import { UserModelDocumentInterface } from '../models/UserModel';

class DialogController {
  io: socket.Server;
  constructor(io: socket.Server) {
    this.io = io;
  }
  async index(req: express.Request, res: express.Response): Promise<void> {
    try {
      const user = req.user as UserModelDocumentInterface;

      if (user) {
        const dialogs = await DialogModel.find()
          .or([{ author: user._id }, { partner: user._id }])
          .populate('author', 'fullname avatar last_seen isOnline')
          .populate('partner', 'fullname avatar last_seen isOnline')
          .populate('newMessages.user', '_id')
          .populate({
            path: 'lastMessage',
            populate: {
              path: 'user dialog',
              select: 'fullname avatar',
            },
          })
          .exec();

        if (dialogs.length === 0) {
          res.status(404).json({
            message: 'Dialogs not found',
          });

          return;
        }
        res.json({
          status: 'success',
          data: dialogs,
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

  async show(req: express.Request, res: express.Response): Promise<void> {
    try {
      const user = req.user as UserModelDocumentInterface;
      const dialogId = req.params.id;
      if (user) {
        const dialog = await DialogModel.findById(dialogId, 'author partner')
          .populate('author', 'fullname avatar last_seen isOnline')
          .populate('partner', 'fullname avatar last_seen isOnline')
          .exec();

        if (!dialog) {
          res.status(404).json({
            message: 'Dialog not found',
          });

          return;
        }
        res.json({
          status: 'success',
          data: dialog,
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
    const author = req.user as UserModelDocumentInterface;

    try {
      if (author) {
        const postData = {
          author: author?.id,
          partner: req.body.partner,
        };

        const dialog = await DialogModel.findOne({
          author: author?.id,
          partner: req.body.partner,
        });

        if (dialog) {
          res.status(403).json({
            status: 'error',
            message: 'Такой диалог уже есть',
          });
        } else {
          const dialogData = await DialogModel.create(postData);

          await UserModel.updateMany(
            {
              _id: {
                $in: [author?.id, req.body.partner],
              },
            },
            { $push: { dialogs: dialogData._id } },
          ).exec();

          dialogData
            .save()
            .then((dialogObj) => {
              const message = new MessageModel({
                text: req.body.text,
                user: author?._id,
                dialog: dialogObj._id,
              });

              message
                .save()
                .then(() => {
                  dialogObj.lastMessage = message._id;
                  dialogObj.newMessages.count = 1;
                  dialogObj.newMessages.user = author?._id;
                  dialogObj.save().then(() => {
                    res.json(dialogObj);
                    this.io.emit('SERVER:DIALOG_CREATED', {
                      ...postData,
                      dialog: dialogObj,
                    });
                  });
                })
                .catch((reason) => {
                  res.json(reason);
                });
            })
            .catch((err) => {
              res.json({
                status: 'error',
                message: err,
              });
            });
        }
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

export default DialogController;
