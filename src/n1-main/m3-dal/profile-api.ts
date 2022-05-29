import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true,
    headers: {
        'API-KEY': ''
    }
})

type ProfileResponseType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number;
    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean; // подтвердил ли почту
    rememberMe: boolean;
    error?: string;
}

type ProfileAuthMeRequestType = {

}

type changeProfileRequestType = {
    name?: string
    avatar?: string
}

type changeProfileResponseType = {
    addedUser: ProfileResponseType
    error?: string
}

export const profileAPI = {
   authMe(data: ProfileAuthMeRequestType) {
        return instance.post<ProfileResponseType>('/auth/me', data)
    },
    changeProfile(data:changeProfileRequestType){
        return instance.put<changeProfileResponseType>('/auth/me', data)
    }
}