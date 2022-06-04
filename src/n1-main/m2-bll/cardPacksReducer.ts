import {cardPacksAPI, CardsPackType} from "../m3-dal/cardPacks-api";
import {AppThunk} from "./store";

const SET_PACKS = 'POST-PACKS'

const initState = {
  cardPacks: [
    {
      _id: '',
      user_id: '',
      name: '',
      cardsCount: 10,
      created: '',
      updated: '',
    },
  ],
  cardPacksTotalCount: 1,
  // количество колод
  maxCardsCount: 1,
  minCardsCount: 1,
  page: 1, // выбранная страница
  pageCount: 1,
} as InitStateType

export const cardPacksReducer = (state: InitStateType = initState , action: CardPacksType): InitStateType => {
  switch (action.type) {

    case SET_PACKS:
      return {...action.data}

    default:
      return state
  }
}

//actions
export const getCardPacksAC = (data: InitStateType) => ({
  type: SET_PACKS,
  data
} as const)


//thunk
export const cardPackTC = (): AppThunk => (dispatch, getState) => {
  const data = getState().packs
  cardPacksAPI.getPacks(data)
    .then((res) => {
      dispatch(getCardPacksAC(res.data))
    })
}
export const postPacksTC = (): AppThunk => (dispatch) => {
  cardPacksAPI.postPacks()
    .then((res) => {
      dispatch(getCardPacksAC(res.data._id))
    })
}
export const deletePacksTC = (packId: string): AppThunk => (dispatch) => {
  cardPacksAPI.deletePacks(packId)
    .then((res) => {
      dispatch(getCardPacksAC(res.data))
    })
}
export const updatePacksTC = (data: CardsPackType): AppThunk => (dispatch) => {
  cardPacksAPI.updatePacks(data)
    .then((res) => {
      dispatch(getCardPacksAC(res.data))
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
  | ReturnType<typeof getCardPacksAC>