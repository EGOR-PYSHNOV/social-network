import { IPost } from './../store/posts/contracts/state';
import axios from 'axios';

interface Response<T> {
  status: string;
  data: T;
}

export const PostsApi = {
  async fetchPosts(userId?: string): Promise<IPost[]> {
    const { data } = await axios.get<Response<IPost[]>>(
      userId ? `/posts/user/${userId}` : '/posts',
    );
    return data.data;
  },

  async fetchPostData(id?: string): Promise<IPost> {
    const { data } = await axios.get<Response<IPost>>('/posts/' + id);

    return data.data;
  },
  async addPost(payload: { text: string }): Promise<IPost> {
    const { data } = await axios.post<Response<IPost>>('/posts', payload);
    return data.data;
  },

  async addCommentToPost(payload: { id?: string; text: string }) {
    await axios.post<Response<IPost>>(`/posts/comment/${payload.id}`, {
      text: payload.text,
    });
  },

  async updatePost(payload: { id: string; text: string }): Promise<void> {
    await axios.patch('/posts/' + payload.id, { text: payload.text });
  },

  async removePost(id: string): Promise<void> {
    await axios.delete('/posts/' + id);
  },

  async toggleLikePost(id: string): Promise<void> {
    await axios.patch('/posts/likes/' + id);
  },
};
