/* eslint-disable import/first */
import dotenv from 'dotenv';
import path from 'path';
dotenv.config();
import './core/db';
import express from 'express';
import multer from 'multer';
import cors from 'cors';

import { createServer } from 'http';

import { passport } from './core/passport';

import { createPostValidations } from './validations/createPost';
import { registerValidations } from './validations/register';

import UserController from './controllers/UserController';
import MessageController from './controllers/MessageController';
import DialogController from './controllers/DialogController';

import { PostsCtrl } from './controllers/PostsController';
import { UploadFileCtrl } from './controllers/UploadFileController';

import { createSocketServer } from './core/socket';

const app = express();
const PORT = process.env.PORT || 8888;
const storage = multer.memoryStorage();
const upload = multer({ storage });

const server = createServer(app);
const io = createSocketServer(server);

const UserCtrl = new UserController(io);
const MessageCtrl = new MessageController(io);
const DialogCtrl = new DialogController(io);

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', function (_, response) {
    response.sendFile(path.resolve('client/build', 'index.html'));
  });
}

app.get('/users/me', passport.authenticate('jwt'), UserCtrl.getUserInfo);
app.get('/users/:id', UserCtrl.show);

app.get('/posts', PostsCtrl.index);
app.get('/posts/:id', PostsCtrl.show);
app.get('/posts/user/:id', PostsCtrl.getUserPosts);

app.post('/posts', passport.authenticate('jwt'), createPostValidations, PostsCtrl.create);
app.delete('/posts/:id', passport.authenticate('jwt'), PostsCtrl.delete);
app.patch('/posts/:id', passport.authenticate('jwt'), createPostValidations, PostsCtrl.update);

app.patch('/posts/likes/:id', passport.authenticate('jwt'), PostsCtrl.togglePostLike);

app.post('/posts/comment/:id', passport.authenticate('jwt'), PostsCtrl.addCommentToPost);

app.get('/auth/verify', UserCtrl.verify);
app.post('/auth/register', registerValidations, UserCtrl.create);
app.post('/auth/login', passport.authenticate('local'), UserCtrl.login);

app.get('/dialogs', passport.authenticate('jwt'), DialogCtrl.index.bind(DialogCtrl));
app.get('/dialogs/:id', passport.authenticate('jwt'), DialogCtrl.show.bind(DialogCtrl));
app.post('/dialogs', passport.authenticate('jwt'), DialogCtrl.create.bind(DialogCtrl));

app.get('/messages', passport.authenticate('jwt'), MessageCtrl.index.bind(MessageCtrl));
app.post('/messages', passport.authenticate('jwt'), MessageCtrl.create.bind(MessageCtrl));

app.post('/upload', upload.single('image'), UploadFileCtrl.upload);

server.listen(PORT, (): void => {
  console.log('SERVER WAS RUNNED!');
});
