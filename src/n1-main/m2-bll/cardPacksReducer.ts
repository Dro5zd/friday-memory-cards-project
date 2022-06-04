import {cardPacksAPI} from "../m3-dal/cardPacks-api";
import {AppThunk} from "./store";

const initState = {} as initStateType

const GET_PACKS = 'GET-PACKS'

export const cardPacksReducer = (state: initStateType = initState, action: CardPacksType): initStateType => {
  switch (action.type) {
    case GET_PACKS:
      return {...action.data}

    default:
      return state
  }
}


//actions
export const cardPacksAC = (data: initStateType) => ({
  type: GET_PACKS,
  data
} as const)

//thunk
export const cardPackTC = (): AppThunk => (dispatch, getState) => {
  const data = getState().packs
  cardPacksAPI.getPacks(data)
    .then((res) => {
      dispatch(cardPacksAC(res.data))
    })
}

//types
type initStateType = {
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
  | ReturnType<typeof cardPacksAC>