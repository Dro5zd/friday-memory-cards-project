import {cardPacksAPI, CreatePackDataType, PacksDataType, UpdateCardsPackType} from "../m3-dal/cardPacks-api";
import {AppThunk} from "./store";

const SET_PACKS = 'POST-PACKS'

const initState = {
  cardPacks: [
    {
      _id: '',
      user_id: '',
      name: '',
      cardsCount: 1,
      created: '',
      updated: '',
      user_name: '',
    },
  ],
  cardPacksTotalCount: 10,
  // количество колод
  maxCardsCount: 9,
  minCardsCount: 3,
  page: 1, // выбранная страница
  pageCount: 10,

  // cardsCount: 0,
  // created: "2022-06-05T20:33:14.268Z",
  // deckCover: "",
  // grade: 0,
  //
  // name: "Where the russian warship was sent? ®",
  // path: "/def",
  // private: false,
  // rating: 0,
  // shots: 0,
  // type: "pack",
  // updated: "2022-06-05T20:33:14.268Z",
  // user_id: "6291cfe9f2b0e900049f70ac",
  // user_name: "Bogdan Mykhailov",
  // __v: 0,
  // _id: "629d130af0ffde100d74e033",
  // token: "b944a7f0-e50e-11ec-9c6c-2785a2807848",
  // tokenDeathTime: 1654471994223,


} as InitStateType

export const cardPacksReducer = (state: InitStateType = initState, action: CardPacksType): InitStateType => {
  switch (action.type) {

    case SET_PACKS:
      return {...action.data}

    default:
      return state
  }
}

//actions
export const setCardPacksAC = (data: InitStateType) => ({
  type: SET_PACKS,
  data
} as const)

//thunk
export const getCardPackTC = (data: PacksDataType): AppThunk => (dispatch, getState) => {
  // const data = getState().packs
  cardPacksAPI.getPacks(data)
    .then((res) => {
      dispatch(setCardPacksAC(res.data))
    })
}

export const postPacksTC = (data: CreatePackDataType): AppThunk => (dispatch, getState) => {
  cardPacksAPI.postPacks(data)
    .then((res) => {
      dispatch(getCardPackTC(res.data))
    })
}
export const deletePacksTC = (packId: string): AppThunk => (dispatch) => {
  cardPacksAPI.deletePacks(packId)
    .then((res) => {
      dispatch(getCardPackTC(res.data))
    })
}
export const updatePacksTC = (data: UpdateCardsPackType): AppThunk => (dispatch) => {
  cardPacksAPI.updatePacks(data)  /*{cardsPack: {_id: data.cardsPack._id, name: data.cardsPack.name}}*/
    .then((res) => {
      dispatch(getCardPackTC(res.data))
    })
}

//types
export type InitStateType = {
  cardPacks: [
    {
      _id: string
      user_id: string
      name: string
      cardsCount: number
      created: string
      updated: string
      user_name: string
    },
  ]
  cardPacksTotalCount: number
  // количество колод
  maxCardsCount: number
  minCardsCount: number
  page: number // выбранная страница
  pageCount: number
}

export type CardPacksType =
  | ReturnType<typeof setCardPacksAC>