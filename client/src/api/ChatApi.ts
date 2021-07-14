import { IDialog } from './../store/dialogs/contracts/state';

import axios from 'axios';
import { IMessage } from '../store/messages/contracts/state';

interface Response<T> {
  status: string;
  data: T;
}

export const ChatApi = {
  async fetchDialogs(): Promise<IDialog[]> {
    const { data } = await axios.get<Response<IDialog[]>>('/dialogs');
    return data.data;
  },
  async getDialog(dialogId: string): Promise<IDialog> {
    const { data } = await axios.get<Response<IDialog>>(`/dialogs/${dialogId}`);
    return data.data;
  },
  async createDialog(partnerId: string): Promise<void> {
    await axios.post<Response<IDialog>>('/dialogs', { partner: partnerId });
  },

  async fetchMessages(dialogId?: string): Promise<IMessage[]> {
    const { data } = await axios.get<Response<IMessage[]>>(`/messages?dialog=${dialogId}`);
    return data.data;
  },
  async addMessage(payload: { text: string; dialogId: string }): Promise<void> {
    await axios.post<Response<IDialog>>('/messages', {
      text: payload.text,
      dialog_id: payload.dialogId,
    });
  },
};
