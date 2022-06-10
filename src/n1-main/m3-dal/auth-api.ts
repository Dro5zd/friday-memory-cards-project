import axios, {AxiosResponse} from 'axios';
import {RecoverPassRequestType} from '../m2-bll/passwordRecoveryReducer';
import {RequestRegisterType} from '../m2-bll/registerReducer';

const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    //baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})

const instanceHeroku = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})

export const authAPI = {
    me() {
        return instance.post<AuthResponseType>('auth/me')
    },

    register(data: RequestRegisterType) {
        return instance.post<RegistrationResponseType>('/auth/register', data)
    },

    loginPost(data: LoginParamsType) {
        return instance.post<LoginParamsType, AxiosResponse>('auth/login', data)
    },

    changeProfile(data: changeProfileRequestType) {
        return instance.put<changeProfileResponseType>('/auth/me', data)
    },

    newPass(newPassData: NewPassParamsType) {
        return instance.post('/auth/set-new-password', newPassData)
    },

    forgot(forgotData: RecoverPassRequestType) {
        return instanceHeroku.post<InfoResponseType>('auth/forgot', forgotData)
    },

    logOut() {
        return instance.delete<AxiosResponse<InfoResponseType>>('auth/me')
    }

}

//types
type RegistrationResponseType = {
    error?: string
}

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

export type changeProfileRequestType = {
    name?: string
    avatar?: string
}

type changeProfileResponseType = {
    updatedUser: AuthResponseType
    error?: string
}