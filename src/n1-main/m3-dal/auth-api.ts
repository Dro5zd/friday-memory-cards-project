import axios, {AxiosResponse} from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:7542/2.0/',
  // baseURL: 'https://neko-back.herokuapp.com/2.0/',
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
}

//types
export type LoginParamsType = {
  email: string,
  password: string,
  rememberMe?: boolean,
}