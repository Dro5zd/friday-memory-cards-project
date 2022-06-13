import axios from 'axios';

import {InitStateType} from "../m2-bll/cardPacksReducer";

const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    //baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})

export const cardPacksAPI = {

    getPacks(uriParams: PacksDataType) {
        return instance.get<InitStateType>(`cards/pack`, {params: uriParams})
    },

    postPacks(data: CreatePackDataType) {
        return instance.post(`cards/pack`, data)
    },

    deletePacks(id: string) {
        return instance.delete(`cards/pack?id=${id}`)
    },

    updatePacks(data: UpdateCardsPackType) {
        return instance.put(`cards/pack`, data)
    },
}

//types
export type PacksDataType = {
    packName?: string,
    min: number,
    max: number,
    sortPacks?: string,
    page: number,
    pageCount: number,
    user_id: string
}
type CardsPackType = {
    _id: string
    name: string
}
export type UpdateCardsPackType = {
    cardsPack: CardsPackType
}

type CardsPackCreatePackType = {
    // name: 'Where the russian ship was sent?',
    name: string,
    deckCover?: string
    private?: boolean
}
export type CreatePackDataType = {
    cardsPack: CardsPackCreatePackType
}