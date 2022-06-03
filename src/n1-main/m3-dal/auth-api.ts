import axios, {AxiosResponse} from 'axios';
import {RecoverPassRequestType} from "../m2-bll/passwordRecoveryReducer";

const instance = axios.create({
  // baseURL: 'http://localhost:7542/2.0/',
  baseURL: 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
  // headers: {
  //   'API-KEY': ''
  // }
})

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
    return instance.post<AuthResponseType>('auth/me')
  },
  newPass(newPassData: NewPassParamsType) {
    return instanceHeroku.post('/auth/set-new-password', newPassData)
  },
  logOut(){
    return instance.delete<AxiosResponse<InfoResponseType>>('auth/me')
  },
    forgot(forgotData: RecoverPassRequestType) {
        return instanceHeroku.post<InfoResponseType>('auth/forgot', forgotData)
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