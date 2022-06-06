import {cardPacksAPI, PacksDataType} from "../m3-dal/cardPacks-api";
import {AppThunk} from "./store";

const SET_USER_PACKS = 'POST-PACKS'

const initState = {
  cardPacks: [
    {
      _id: '',
      user_id: '',
      name: '🇺🇦🇺🇦🇺🇦🇺🇦🇺🇦',
      cardsCount: 1000,
      created: '',
      updated: '',
      user_name: ''
    },
  ],
  cardPacksTotalCount: 10,
  // количество колод
  maxCardsCount: 9,
  minCardsCount: 3,
  page: 1, // выбранная страница
  pageCount: 10,

} as InitStateType

export const sortReducer = (state: InitStateType = initState , action: CardPacksType): InitStateType => {
  switch (action.type) {

    case SET_USER_PACKS:
      return {...action.data}

    default:
      return state
  }
}

//actions
export const getUserPacksAC = (data: InitStateType) => ({
  type: SET_USER_PACKS,
  data
} as const)


//thunk
export const getUserPacksTC = (data: PacksDataType): AppThunk => (dispatch) => {
  const pageCount = 10
  cardPacksAPI.getPacks({user_id: data.user_id, pageCount: pageCount})
    .then((res) => {
      dispatch(getUserPacksAC(res.data))
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
  | ReturnType<typeof getUserPacksAC>