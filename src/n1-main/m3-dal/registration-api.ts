import axios from 'axios';
import {RequestRegisterType} from "../m2-bll/registerReducer";

const instance = axios.create({
  // baseURL: 'http://localhost:7542/2.0/',
  baseURL: 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
  headers: {
    'API-KEY': ''
  }
})

type RegistrationResponseType = {
  error?: string
}

export const registrationAPI = {
  async register(data: RequestRegisterType) {
    return await instance.post<RegistrationResponseType>('/auth/register', data)
  },
}