import { isValidObjectId } from './../utils/isValidObjectId';
import { UserModelDocumentInterface } from './../models/UserModel';
import { handlePasswordHashing } from './../utils/generateHash';
import { sendEmail } from './../utils/sendEmail';
import express from 'express';
import jwt from 'jsonwebtoken';
import socket from 'socket.io';
import { validationResult } from 'express-validator';
import { UserModel, UserModelInterface } from '../models/UserModel';

//import { isValidObjectId } from '../utils/isValidObjectId';

class UserController {
  // async index(_: any, res: express.Response): Promise<void> {
  //   try {
  //     const users = await UserModel.find({}).exec();

  //     res.json({
  //       status: 'success',
  //       data: users,
  //     });
  //   } catch (error) {
  //     res.status(500).json({
  //       status: 'error',
  //       message: error,
  //     });
  //   }
  // }

  io: socket.Server;
  constructor(io: socket.Server) {
    this.io = io;
  }

  async show(req: any, res: express.Response): Promise<void> {
    try {
      const userId = req.params.id;

      if (!isValidObjectId(userId)) {
        res.status(400).send();
        return;
      }

      const user = await UserModel.findById(userId)
        .populate({
          path: 'dialogs',
          populate: {
            path: 'author partner',
            select: '_id',
          },
        })
        .exec();

      console.log(user);

      if (!user) {
        res.status(404).send();
        return;
      }

      res.json({
        status: 'success',
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error,
      });
    }
  }

  async create(req: express.Request, res: express.Response): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ status: 'error', errors: errors.array() });
        return;
      }

      const password = handlePasswordHashing(req.body.password, 8);
      const confirmHash = handlePasswordHashing(process.env.SECRET_KEY || '8jPhLPpcNnEM9Cy', 8);

      const data: UserModelInterface = {
        email: req.body.email,
        username: req.body.username,
        fullname: req.body.fullname,
        about: req.body.about,
        location: req.body.location,
        avatar: req.body.avatar,
        password: password,
        confirmHash: confirmHash,
      };

      const user = await UserModel.create(data);

      sendEmail(
        {
          emailFrom: 'pyshnovegor@yandex.by',
          emailTo: data.email,
          subject: 'Подтверждение почты Social Network',
          html: `Для того, чтобы подтвердить почту, перейдите <a href="http://localhost:3000/user/activate/${data.confirmHash}">по этой ссылке</a>`,
        },
        (err: Error | null) => {
          if (err) {
            res.status(500).json({
              status: 'error',
              message: err,
            });
          } else {
            res.status(201).json({
              status: 'success',
              data: user,
            });
          }
        },
      );
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error,
      });
    }
  }

  async verify(req: any, res: express.Response): Promise<void> {
    try {
      const hash = req.query.hash;

      if (!hash) {
        res.status(400).send();
        return;
      }

      const user = await UserModel.findOne({ confirmHash: hash }).exec();

      if (user) {
        user.confirmed = true;
        await user.save();

        res.json({
          status: 'success',
          data: {
            ...user.toJSON(),
            token: jwt.sign({ data: user.toJSON() }, process.env.SECRET_KEY || '123', {
              expiresIn: '24h',
            }),
          },
        });
      } else {
        res.status(404).json({ status: 'error', message: 'Пользователь не найден' });
      }
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error,
      });
    }
  }

  async login(req: express.Request, res: express.Response): Promise<void> {
    try {
      const user = req.user ? (req.user as UserModelDocumentInterface).toJSON() : undefined;
      if (user) {
        res.json({
          status: 'success',
          data: {
            ...user,
            token: jwt.sign({ data: user['_id'] }, process.env.SECRET_KEY || '123', {
              expiresIn: '24h',
            }),
          },
        });
      }
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error,
      });
    }
  }

  async getUserInfo(req: express.Request, res: express.Response): Promise<void> {
    try {
      const user = req.user ? (req.user as UserModelDocumentInterface).toJSON() : undefined;
      res.json({
        status: 'success',
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error,
      });
    }
  }
}

export default UserController;
