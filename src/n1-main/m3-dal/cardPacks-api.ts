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
    return instance.get(`cards/pack`, {data})
  },

  // getPacks() {
  //   return instance.get(`cards/pack`, {
  //     params: {
  //       packName: '🇺🇦',
  //       min: 9,
  //       max: 3,
  //       sortPacks: 1,
  //       page: 1,
  //       pageCount: 10,
  //       user_id: '6291cfe9f2b0e900049f70ac'
  //     }
  //   })
  // },

  postPacks() {
    return instance.post(`cards/pack`, {
      cardsPack: {
        name: '🇺🇦',
        deckCover: '',
        private: false
      }
    })
  },

  deletePacks(id: string) {
    return instance.delete(`cards/pack?id=${id}`)
  },

  updatePacks(id: string, name: string) {
    return instance.put(`cards/pack`, {id, name})
  },
}

//types
export type PacksDataType = {
  packName?: string,
  min?: number,
  max?: number,
  sortPacks?: number,
  page?: number,
  pageCount?: number,
  user_id?: string
}

// export type CardsPackType = {
//   _id: string
//   name: string
// }

// export type CreatePackDataType = {
//   cardsPack: {
//     // name: 'Where the russian ship was sent?',
//     name: string,
//     deckCover: string,
//     private: boolean
//   }
// }