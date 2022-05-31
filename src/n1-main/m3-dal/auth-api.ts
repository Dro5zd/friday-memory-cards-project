import axios, {AxiosResponse} from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:7542/2.0/',
  // baseURL: 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
  // headers: {
  //   'API-KEY': ''
  // }
})

// Нужно спросить Давида зачем ??

const instanceHeroku = axios.create({
  baseURL: 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
  headers: {
    'API-KEY': ''
  }
})

export const authAPI = {
  // getTest() {
  //   return instance.get('ping')
  // },
  loginPost(data: LoginParamsType) {
    return instance.post<LoginParamsType, AxiosResponse>('auth/login', data)
  },
  me() {
    return instance.post<AxiosResponse<AuthResponseType>>('auth/me')
  },
  forgot(forgotData: any) {
    return instanceHeroku.post<AxiosResponse<InfoResponseType>>('auth/forgot', forgotData)
  },
  newPass(newPassData: NewPassParamsType) {
    return instance.post('/auth/set-new-password', newPassData)
  },
  logOut(){
    return instance.delete<AxiosResponse<InfoResponseType>>('auth/me')
  }
}

//types
export type LoginParamsType = {
  email: string,
  password: string,
  rememberMe?: boolean,
}
export type NewPassParamsType = {
  password: string,
  resetPasswordToken: string
}
export type AuthResponseType = {
  _id: string;
  email: string;
  name: string;
  avatar: string;
  publicCardPacksCount: number;
  created: Date;
  updated: Date;
  isAdmin: boolean;
  verified: boolean; // подтвердил ли почту
  rememberMe: boolean;
  error?: string;
}
type InfoResponseType = {
  info: string;
  error?: string
}