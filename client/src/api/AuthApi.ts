import { axios } from '../core/axios';
import { ISignUp } from './../store/user/contracts/state';

interface ResponseApi {
  status: string;
  data: any;
}

export const AuthApi = {
  async verify(hash: string): Promise<ResponseApi> {
    const { data } = await axios.get<ResponseApi>('/auth/verify?hash=' + hash);
    console.log(data);
    return data;
  },

  async signUp(postData: ISignUp): Promise<ResponseApi> {
    const { data } = await axios.post<ResponseApi>('/auth/register', {
      email: postData.email,
      username: postData.username,
      fullname: postData.fullname,
      password: postData.password,
      password2: postData.password2,
      about: postData.about,
      avatar: postData.avatar,
      location: postData.location,
    });
    return data;
  },
  async signIn(postData: Pick<ISignUp, 'username' | 'password'>): Promise<ResponseApi> {
    const { data } = await axios.post<ResponseApi>('/auth/login', {
      username: postData.username,
      password: postData.password,
    });
    return data;
  },

  async getMe(): Promise<ResponseApi> {
    const { data } = await axios.get<ResponseApi>('/users/me');
    return data;
  },

  async getUserInfo(userId: string): Promise<ResponseApi> {
    const { data } = await axios.get<ResponseApi>('/users/' + userId);
    return data;
  },
};

// @ts-ignore
window.AuthApi = AuthApi;
