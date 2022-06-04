import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:7542/2.0/',
  // baseURL: 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
  // headers: {
  //   'API-KEY': ''
  // }
})

export const cardPacksAPI = {
  getPacks(data: PacksDataType) {
    return instance.get('cards/pack', {data})
  },
}

//types
export type PacksDataType = {
  packName?: string,
  min?: number,
  max?: number,
  // sortPacks?: number,
  page?: number,
  pageCount?: number,
  user_id?: string
}
