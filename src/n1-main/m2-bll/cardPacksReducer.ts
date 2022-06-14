import {cardPacksAPI, CreatePackDataType, UpdateCardsPackType} from '../m3-dal/cardPacks-api';
import {AppThunk} from './store';
import {serverErrorHandler} from "../utils/serverErrorHandler";
import {setStatusAC} from "./appReducer";
import {setRangeValueAC} from "./sortReducer";

const SET_PACKS = 'POST-PACKS'

const initState = {
    cardPacks: [
        {
            _id: '',
            user_id: '',
            name: '🇺🇦🇺🇦🇺🇦🇺🇦🇺🇦',
            cardsCount: 1,
            created: '',
            updated: 'Date.now()',
            user_name: '',
        },
    ],
    cardPacksTotalCount: 10,
    maxCardsCount: 103,
    minCardsCount: 0,
    page: 1,
    pageCount: 10,
}

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
export const getCardPackTC = (): AppThunk => (dispatch, getState) => {
    dispatch(setStatusAC('loading'))
    const pageCount = getState().app.potionValue
    const currentPage = getState().app.packsCurrentPage
    const user_id = getState().sort.user_id
    const sortPacks = getState().sort.sortPacks
    const minValue = getState().sort.packMinValue
    const maxValue = getState().sort.packMaxValue
    const packName = getState().sort.packName
    cardPacksAPI.getPacks({
        user_id: user_id, pageCount: pageCount, sortPacks: sortPacks,
        page: currentPage, min: minValue, max: maxValue, packName: packName
    })
        .then((res) => {
            dispatch(setCardPacksAC(res.data))
            dispatch(setStatusAC('succeeded'))
        })
        .catch(() => {
            serverErrorHandler('Sorry, not able to get packs, that You are looking for, try again', dispatch)
        })
}
export const postPacksTC = (data: CreatePackDataType): AppThunk => (dispatch) => {
    dispatch(setStatusAC('loading'))
    cardPacksAPI.postPacks(data)
        .then((res) => {
            dispatch(getCardPackTC())
            dispatch(setStatusAC('succeeded'))
        })
        .catch(() => {
            serverErrorHandler('Sorry, not able to create pack, try again', dispatch)
        })
}
export const deletePacksTC = (packId: string): AppThunk => (dispatch) => {
    dispatch(setStatusAC('loading'))
    cardPacksAPI.deletePacks(packId)
        .then((res) => {
            dispatch(getCardPackTC())
            dispatch(setStatusAC('succeeded'))
        })
        .catch(() => {
            serverErrorHandler('Sorry, not able to delete pack, try again', dispatch)
        })
}
export const updatePacksTC = (packId: string, packName: string): AppThunk => (dispatch) => {
    dispatch(setStatusAC('loading'))
    cardPacksAPI.updatePacks({cardsPack: {_id: packId, name: packName}})
        .then((res) => {
            dispatch(getCardPackTC())
            dispatch(setStatusAC('succeeded'))
        })
        .catch(() => {
            serverErrorHandler('Sorry, not able to update pack, try again', dispatch)
        })
}

//types
export type CardPackType = {
    _id: string
    user_id: string
    name: string
    cardsCount: number
    created: string
    updated: string
    user_name: string
}
export type InitStateType = {
    cardPacks: CardPackType[]
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
}

export type CardPacksType =
    | ReturnType<typeof setCardPacksAC>