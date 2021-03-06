import {Dispatch} from "redux";
import {authAPI} from "../m3-dal/auth-api";
import {updateProfileAC} from './profileReducer';
import {loginAC} from "./loginReducer";
import {AppThunk} from "./store";

const initState: InitStateType = {
    isAuthorised: false,
    isInitialised: false,
    passChanged: false,
    cardsCurrentPage: 1,
    packsCurrentPage: 1,
    errors: [],
    status: 'idle',
    packsPortionValue: 10,
    cardsPortionValue: 10
}
type InitStateType = {
    isAuthorised: boolean;
    isInitialised: boolean;
    passChanged: boolean;
    cardsCurrentPage: number;
    packsCurrentPage: number;
    errors: string[];
    status: RequestStatusType
    packsPortionValue: number
    cardsPortionValue: number
}

export const appReducer = (state = initState, action: AppActionType): InitStateType => {
    switch (action.type) {
        case "SET-IS-AUTHORISED":
            return {...state, isAuthorised: action.isAuthorised}
        case "SET-IS-INITIALISED":
            return {...state, isInitialised: action.isInitialised}
        case 'SET-CHANGED-PASS':
            return {...state, passChanged: action.passChanged}
        case "CHANGE-CARDS-CURRENT-PAGE":
            return {...state, cardsCurrentPage: action.page}
        case "CHANGE-PACKS-CURRENT-PAGE":
            return {...state, packsCurrentPage: action.page}
        case "SET-SERVER-ERROR":
            return {...state, errors: [...state.errors, action.error]}
        case "CLEAR-SERVER-ERROR":
            return {...state, errors: []}
        case 'SET-STATUS':
            return {...state, status: action.status}
        case 'SET-PACKS-PORTION':
            return {...state, packsPortionValue: action.value}
        case 'SET-CARDS-PORTION':
            return {...state, cardsPortionValue: action.value}

        default:
            return state
    }
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export const setIsAuthorisedAC = (isAuthorised: boolean) => ({type: "SET-IS-AUTHORISED", isAuthorised} as const)
export const setIsInitialisedAC = (isInitialised: boolean) => ({type: "SET-IS-INITIALISED", isInitialised} as const)
export const setChangedPassAC = (passChanged: boolean) => ({type: 'SET-CHANGED-PASS', passChanged} as const)
export const changeCardsCurrentPageAC = (page: number) => ({type: 'CHANGE-CARDS-CURRENT-PAGE', page} as const)
export const changePacksCurrentPageAC = (page: number) => ({type: 'CHANGE-PACKS-CURRENT-PAGE', page} as const)
export const setErrorsAC = (error: string) => ({type: 'SET-SERVER-ERROR', error} as const)
export const clearErrorsAC = () => ({type: 'CLEAR-SERVER-ERROR'} as const)
export const setStatusAC = (status: RequestStatusType) => ({type: 'SET-STATUS', status} as const)
export const setPacksPortionAC = (value: number) => ({type: 'SET-PACKS-PORTION', value} as const)
export const setCardsPortionAC = (value: number) => ({type: 'SET-CARDS-PORTION', value} as const)

export const authoriseMeTC = (): AppThunk => (dispatch) => {
    dispatch(setStatusAC('loading'))
    authAPI.me().then((res) => {
        dispatch(loginAC(res.data))
        dispatch(setIsAuthorisedAC(true))
        dispatch(setChangedPassAC(true))
        dispatch(updateProfileAC(res.data.name, res.data.avatar))
    }).finally(() => {
        dispatch(setIsInitialisedAC(true))
        dispatch(setStatusAC('succeeded'))
    })
}

export const logOutMeTC = () => (dispatch: Dispatch<AppActionType>) => {
    /*dispatch(setIsInitialisedAC(false))*/
    authAPI.logOut().then((res) => {
        dispatch(setIsAuthorisedAC(false))
    })
}

export type AppActionType =
    | ReturnType<typeof setIsAuthorisedAC>
    | ReturnType<typeof setIsInitialisedAC>
    | ReturnType<typeof setChangedPassAC>
    | ReturnType<typeof updateProfileAC>
    | ReturnType<typeof changeCardsCurrentPageAC>
    | ReturnType<typeof changePacksCurrentPageAC>
    | ReturnType<typeof setErrorsAC>
    | ReturnType<typeof clearErrorsAC>
    | ReturnType<typeof setStatusAC>
    | ReturnType<typeof setPacksPortionAC>
    | ReturnType<typeof setCardsPortionAC>

