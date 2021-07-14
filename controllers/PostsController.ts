import { UserModelInterface, UserModelDocumentInterface } from './../models/UserModel';
import { isValidObjectId } from './../utils/isValidObjectId';
import express from 'express';

import { validationResult } from 'express-validator';
import { PostModel } from './../models/PostModel';

class PostsController {
  async index(_: any, res: express.Response): Promise<void> {
    try {
      const posts = await PostModel.find({})
        .populate('user', 'fullname avatar')
        .populate('likes', 'fullname avatar')
        .populate('comments', 'fullname avatar')
        .sort({ createdAt: '-1' })
        .exec();

      res.json({
        status: 'success',
        data: posts,
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error,
      });
    }
  }

  async show(req: any, res: express.Response): Promise<void> {
    try {
      const postId = req.params.id;

      if (!isValidObjectId(postId)) {
        res.status(400).send();
        return;
      }

      const post = await PostModel.findById(postId)
        .populate('user')
        .populate('likes', 'fullname avatar')
        .populate('comments.user', 'fullname avatar')

        .exec();

      if (!post) {
        res.status(404).send();
        return;
      }

      res.json({
        status: 'success',
        data: post,
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error,
      });
    }
  }

  async getUserPosts(req: any, res: express.Response): Promise<void> {
    try {
      const userId = req.params.id;

      if (!isValidObjectId(userId)) {
        res.status(400).send();
        return;
      }

      const post = await PostModel.find({ user: userId })
        .populate('user', 'fullname avatar')
        .populate('likes', 'fullname avatar')
        .sort({ createdAt: '-1' })
        .exec();

      if (!post) {
        res.status(404).send();
        return;
      }

      res.json({
        status: 'success',
        data: post,
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
      const user = req.user as UserModelDocumentInterface;
      const errors = validationResult(req);

      if (user?._id) {
        if (!errors.isEmpty()) {
          res.status(400).json({ status: 'error', errors: errors.array() });
          return;
        }

        // TODO: Поправить типизацию
        const data: any = {
          text: req.body.text,
          images: req.body.images,
          user: user._id,
        };

        const post = await PostModel.create(data);

        res.json({
          status: 'success',
          data: await post.populate('user', 'fullname ').execPopulate(),
        });
      }
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error,
      });
    }
  }

  async delete(req: express.Request, res: express.Response): Promise<void> {
    const user = req.user as UserModelInterface;

    try {
      if (user) {
        const postId = req.params.id;

        if (!isValidObjectId(postId)) {
          res.status(400).send();
          return;
        }

        const post = await PostModel.findById(postId);

        if (post) {
          if (String(post.user._id) === String(user._id)) {
            post.remove();
            res.status(200).json({
              status: 'success',
            });
          } else {
            res.status(403).send();
          }
        } else {
          res.status(404).send();
        }
      }
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error,
      });
    }
  }

  async update(req: express.Request, res: express.Response): Promise<void> {
    const user = req.user as UserModelInterface;

    try {
      if (user) {
        const postId = req.params.id;

        if (!isValidObjectId(postId)) {
          res.status(400).send();
          return;
        }

        const post = await PostModel.findById(postId);

        if (post) {
          if (String(post.user._id) === String(user._id)) {
            const text = req.body.text;
            post.text = text;
            post.save();
            res.status(200).json({
              status: 'success',
            });
          } else {
            res.status(403).send();
          }
        } else {
          res.status(404).send();
        }
      }
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error,
      });
    }
  }

  async addCommentToPost(req: express.Request, res: express.Response): Promise<void> {
    const user = req.user as UserModelDocumentInterface;

    try {
      if (user) {
        const postId = req.params.id;

        if (!isValidObjectId(postId)) {
          res.status(400).send();
          return;
        }

        const post = await PostModel.findById(postId);

        if (post) {
          const commentUser = {
            user,
            text: req.body.text,
          };

          post.comments?.push(commentUser);
          post.save();
          res.status(200).json({
            status: 'success',
          });
        } else {
          res.status(404).send();
        }
      }
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error,
      });
    }
  }

  async togglePostLike(req: express.Request, res: express.Response): Promise<void> {
    const user = req.user as UserModelDocumentInterface;

    try {
      if (user) {
        const postId = req.params.id;

        if (!isValidObjectId(postId)) {
          res.status(400).send();
          return;
        }

        const post = await PostModel.findById(postId);

        if (post) {
          const likeUser = await PostModel.find({ _id: postId, likes: { $in: [user.id] } });

          if (likeUser.length !== 0) {
            await PostModel.updateOne(
              { _id: postId },
              { $pull: { likes: user.id } },
              { upsert: false, multi: true },
            ).exec();
          } else {
            post.likes?.push(user);
          }
          post.save();
          res.status(200).json({
            status: 'success',
          });
        } else {
          res.status(403).send();
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

export const PostsCtrl = new PostsController();
