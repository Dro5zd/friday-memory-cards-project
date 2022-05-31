import {Dispatch} from "redux";
import {authAPI} from "../m3-dal/auth-api";

const initState = {
    isAuthorised: false,
    isInitialised: false,
}
type InitStateType = {
    isAuthorised: boolean;
    isInitialised: boolean;
}

export const appReducer = (state: InitStateType = initState, action: ActionType): InitStateType => {
    switch (action.type) {
        case "SET-IS-AUTHORISED":
            return {...state, isAuthorised: action.isAuthorised}
        case "SET-IS-INITIALISED":
            return {...state, isInitialised: action.isInitialised}
        case "LOG-OUT":
            return {...state, isAuthorised: action.isAuthorised}
        default:
            return state
    }
}

export const setIsAuthorisedAC = (isAuthorised: boolean) => ({type: "SET-IS-AUTHORISED", isAuthorised} as const)
export const setIsInitialisedAC = (isInitialised: boolean) => ({type: "SET-IS-INITIALISED", isInitialised} as const)
export const logOutAC = (isAuthorised: boolean) => ({type: "LOG-OUT", isAuthorised} as const)

export const authoriseMeTC = () => (dispatch: Dispatch<ActionType>) => {
    /*dispatch(setIsInitialisedAC(false))*/
    authAPI.me().then((res) => {
        dispatch(setIsAuthorisedAC(true))
    }).finally(() => {
        dispatch(setIsInitialisedAC(true))
    })
}

export const logOutMeTC = () => (dispatch: Dispatch<ActionType>) => {
    /*dispatch(setIsInitialisedAC(false))*/
    authAPI.logOut().then((res) => {
        dispatch(setIsAuthorisedAC(false))
    })
}

type ActionType = ReturnType<typeof setIsAuthorisedAC> | ReturnType<typeof setIsInitialisedAC> | ReturnType<typeof logOutAC>