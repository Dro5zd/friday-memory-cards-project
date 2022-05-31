import axios from 'axios';
import {AuthResponseType} from './auth-api';

const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true,
    headers: {
        'API-KEY': ''
    }
})

export type changeProfileRequestType = {
    name: string
    avatar: string
}

type changeProfileResponseType = {
    updatedUser: AuthResponseType
    error?: string
}

export const profileAPI = {
    changeProfile(data:changeProfileRequestType){
        return instance.put<changeProfileResponseType>('/auth/me', data)
    }
}