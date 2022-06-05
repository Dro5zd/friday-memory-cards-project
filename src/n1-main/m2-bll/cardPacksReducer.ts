import {cardPacksAPI} from "../m3-dal/cardPacks-api";
import {AppThunk} from "./store";

const SET_PACKS = 'POST-PACKS'

const initState = {
  cardPacks: [
    {
      _id: '',
      user_id: '',
      name: '🇷🇺 ⛴ => 🖕🏻',
      cardsCount: 1000,
      created: '',
      updated: '',
    },
  ],
  cardPacksTotalCount: 10,
  // количество колод
  maxCardsCount: 9,
  minCardsCount: 3,
  page: 10, // выбранная страница
  pageCount: 10,
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

export const postPacksTC = (): AppThunk => (dispatch, getState) => {
  cardPacksAPI.postPacks()
    .then((res) => {
      dispatch(cardPackTC())
    })
}
export const deletePacksTC = (packId: string): AppThunk => (dispatch) => {
  cardPacksAPI.deletePacks(packId)
    .then((res) => {
      dispatch(cardPackTC())
    })
}
export const updatePacksTC = (id: string, name: string): AppThunk => (dispatch) => {
  cardPacksAPI.updatePacks(id, name)
    .then((res) => {
      dispatch(cardPackTC())
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