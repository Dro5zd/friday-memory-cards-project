import {Dispatch} from "redux";
import {registrationAPI} from "../m3-dal/registration-api";

const initState = {
    isRegistered: false
}

type InitStateType = {
    isRegistered: boolean
    error?: string
}
export type RequestRegisterType = {
    email: string
    password: string
}

export const registerReducer = (state: InitStateType = initState, action: ActionType): InitStateType => {
    switch (action.type) {
        case 'SET-ERROR':
            debugger
            return {...state, error: action.error}
        case "SET-IS-REGISTERED":
            return {...state, isRegistered: action.isRegistered}
        default:
            return state
    }
}

type ActionType = ReturnType<typeof setRegisterErrorAC> | ReturnType<typeof setIsRegisteredAC>

export const setRegisterErrorAC = (error?: string) => {
    return ({type: 'SET-ERROR', error} as const)
};
export const setIsRegisteredAC = (isRegistered: boolean) => {
    return ({type: 'SET-IS-REGISTERED', isRegistered} as const)
};
export const registerTC = (data: RequestRegisterType) => /*async*/ (dispatch: Dispatch<ActionType>) => {
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
        if (res.status === 201) {
            dispatch(setIsRegisteredAC(true))
        } else if (res.data.error) {
            dispatch(setRegisterErrorAC(res.data.error))
        }
    }).catch((error) => dispatch(setRegisterErrorAC(error.message)))
}
