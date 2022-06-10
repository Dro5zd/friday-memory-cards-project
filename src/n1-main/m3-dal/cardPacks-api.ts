import axios from 'axios';

const instance = axios.create({
  // baseURL: 'http://localhost:7542/2.0/',
  baseURL: 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
  // headers: {
  //   'API-KEY': ''
  // }
})

export const cardPacksAPI = {

  getPacks(uriParams: PacksDataType) {
    return instance.get(`cards/pack`, {params: uriParams})
  },

  // sortUpdatePack(data: PacksDataType) {
  //   return instance.get(`cards/pack&sortPacks=1updated`, {params: data})
  // },

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
  deckCover?: string,
  private?: boolean
}
export type CreatePackDataType = {
  cardsPack: CardsPackCreatePackType
}