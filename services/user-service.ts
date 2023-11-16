import { api } from './api';

class UserServiceApi {
  getUserInfo = async () => {
    return api.get('/userinfo');
  };
}

export const userServiceApi = new UserServiceApi();
