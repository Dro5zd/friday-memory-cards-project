import {cardPacksAPI} from "../m3-dal/cardPacks-api";
import {AppThunk} from "./store";
import {setCardPacksAC} from './cardPacksReducer';

const initState = {
  user_id: '',
  sortPacks: '0updated'
} as InitStateType

export const sortReducer = (state: InitStateType = initState , action: SortReducerActionType): InitStateType => {
  switch (action.type) {

    case 'SET-MY-ALL-FILTER':
      return {...state, user_id: action.user_id}

    case 'SET-UPDATED-FILTER':
      return {...state, sortPacks: action.sortPacks}

    default:
      return state
  }
}

//actions
export const setMyAllFilterAC = (user_id: string) => ({
  type: 'SET-MY-ALL-FILTER',
  user_id
} as const)

export const setUpdatedFilterAC = (sortPacks: string) => ({
  type: 'SET-UPDATED-FILTER',
  sortPacks
} as const)


//thunk
export const getUserPacksTC = (): AppThunk => (dispatch, getState) => {
  const pageCount = 10
  const currentPage = getState().app.packsCurrentPage
  const user_id = getState().sort.user_id
  const sortPacks = getState().sort.sortPacks
  cardPacksAPI.getPacks({user_id: user_id, pageCount: pageCount, sortPacks: sortPacks, page: currentPage})
    .then((res) => {
      dispatch(setCardPacksAC(res.data))
    })
}

//types
export type InitStateType = {
  user_id: string
  sortPacks: string
}

export type SortReducerActionType =
  | ReturnType<typeof setMyAllFilterAC>
  | ReturnType<typeof setUpdatedFilterAC>