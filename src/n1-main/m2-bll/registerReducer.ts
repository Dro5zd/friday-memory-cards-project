import {Dispatch} from "redux";
import {authAPI} from '../m3-dal/auth-api';
import {setStatusAC} from "./appReducer";

const initState = {
    isRegistered: false
}


export const registerReducer = (state: InitStateType = initState, action: RegistrationActionType): InitStateType => {
    switch (action.type) {
        case 'SET-ERROR':
            return {...state, error: action.error}
        case "SET-IS-REGISTERED":
            return {...state, isRegistered: action.isRegistered}
        default:
            return state
    }
}

export const setRegisterErrorAC = (error?: string) => {
    return ({type: 'SET-ERROR', error} as const)
};
export const setIsRegisteredAC = (isRegistered: boolean) => {
    return ({type: 'SET-IS-REGISTERED', isRegistered} as const)
};
export const registerTC = (data: RequestRegisterType) => /*async*/ (dispatch: Dispatch<RegistrationActionType>) => {
    dispatch(setStatusAC('loading'))
    /*const response = await registrationAPI.register(data)
    try {
            if (response.data?.error
            ) {
                throw new Error(response.data.error)
            }
            dispatch(setIsRegisteredAC(true))
        } catch
            (error) {
            if (error instanceof Error) {
                dispatch(setRegisterErrorAC(error.message))
            }
        }*/
    authAPI.register(data).then(res => {
        dispatch(setIsRegisteredAC(true))
        dispatch(setStatusAC('succeeded'))
    })
      .catch((error) =>
        dispatch(setRegisterErrorAC(error.response.data.error))
      )
}

//types
export type RegistrationActionType =
    | ReturnType<typeof setRegisterErrorAC>
    | ReturnType<typeof setIsRegisteredAC>
    | ReturnType<typeof setStatusAC>


type InitStateType = {
    isRegistered: boolean
    error?: string
}
export type RequestRegisterType = {
    email: string
    password: string
}