import {Dispatch} from "redux";
import {authAPI} from "../m3-dal/auth-api";
import {updateProfileAC} from './profileReducer';
import {loginAC} from "./loginReducer";
import {AppThunk} from "./store";

const SET_CHANGED_PASS = "SET-CHANGED-PASS"

const initState: InitStateType = {
    isAuthorised: false,
    isInitialised: false,
    passChanged: false,
    cardsCurrentPage: 1,
    packsCurrentPage: 1,
    errors: [],
}
type InitStateType = {
    isAuthorised: boolean;
    isInitialised: boolean;
    passChanged: boolean;
    cardsCurrentPage: number;
    packsCurrentPage: number;
    errors: string[];
}

export const appReducer = (state = initState, action: AppActionType): InitStateType => {
    switch (action.type) {
        case "SET-IS-AUTHORISED":
            return {...state, isAuthorised: action.isAuthorised}
        case "SET-IS-INITIALISED":
            return {...state, isInitialised: action.isInitialised}
        case SET_CHANGED_PASS:
            return {...state, passChanged: action.passChanged}
        case "CHANGE-CARDS-CURRENT-PAGE":
            return {...state, cardsCurrentPage: action.page}
        case "CHANGE-PACKS-CURRENT-PAGE":
            return {...state, packsCurrentPage: action.page}
        case "SET-SERVER-ERROR":
            return {...state, errors: [...state.errors, action.error]}
        case "CLEAR-SERVER-ERROR":
            return {...state, errors: []}

        default:
            return state
    }
}

export const setIsAuthorisedAC = (isAuthorised: boolean) => ({type: "SET-IS-AUTHORISED", isAuthorised} as const)
export const setIsInitialisedAC = (isInitialised: boolean) => ({type: "SET-IS-INITIALISED", isInitialised} as const)
export const setChangedPassAC = (passChanged: boolean) => ({type: SET_CHANGED_PASS, passChanged} as const)
export const changeCardsCurrentPageAC = (page: number) => ({type: 'CHANGE-CARDS-CURRENT-PAGE', page} as const)
export const changePacksCurrentPageAC = (page: number) => ({type: 'CHANGE-PACKS-CURRENT-PAGE', page} as const)
export const setErrorsAC = (error: string) => ({type: 'SET-SERVER-ERROR', error} as const)
export const clearErrorsAC = () => ({type: 'CLEAR-SERVER-ERROR'} as const)

export const authoriseMeTC = (): AppThunk => (dispatch) => {
    authAPI.me().then((res) => {
        dispatch(loginAC(res.data))
        dispatch(setIsAuthorisedAC(true))
        dispatch(setChangedPassAC(true))
        dispatch(updateProfileAC(res.data.name, res.data.avatar))
    }).finally(() => {
        dispatch(setIsInitialisedAC(true))
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

