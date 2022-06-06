import {Dispatch} from "redux";
import {registrationAPI} from "../m3-dal/registration-api";

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
    registrationAPI.register(data).then(res => {
        dispatch(setIsRegisteredAC(true))
    }).catch((error) => dispatch(setRegisterErrorAC(error.response.data.error))) //FIX MESSAGE
}

//types
export type RegistrationActionType =
    | ReturnType<typeof setRegisterErrorAC>
    | ReturnType<typeof setIsRegisteredAC>


type InitStateType = {
    isRegistered: boolean
    error?: string
}
export type RequestRegisterType = {
    email: string
    password: string
}