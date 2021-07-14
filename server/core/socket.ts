import { DialogModel } from './../models/DialogModel';
import { UserModel } from './../models/UserModel';
import { Server } from 'socket.io';

import http from 'http';

interface IDialog {
  dialogId: string;
  userId: string;
}

export const createSocketServer = (server: http.Server) => {
  const io = new Server(server, {
    cors: {
      origin: '*',
    },
  });

  io.on('connection', function (socket: any) {
    socket.on('DIALOGS:JOIN', (dialogId: string) => {
      socket.join(dialogId);
    });
    socket.on('CLIENT:MESSAGES_READED', async (dialogId: string) => {
      socket.broadcast.emit('SERVER:MESSAGES_READED', dialogId);
    });
    socket.on('CLIENT:DIALOG_IS_OPEN', async (dialog: any) => {
      await DialogModel.updateOne(
        { _id: dialog.dialogId },
        {
          newMessages: {
            count: 0,
            user: dialog.user,
          },
        },
      );
    });
    socket.on('DIALOGS:TYPING', async (obj: IDialog) => {
      const user = await UserModel.findById(obj.userId, 'avatar');

      const dataTyping = {
        dialog: obj.dialogId,
        user,
      };

      socket.broadcast.to(obj.dialogId).emit('DIALOGS:TYPING', dataTyping);
    });
  });

  return io;
};
