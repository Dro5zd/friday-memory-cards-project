import {Dispatch} from "redux";
import {authAPI} from "../m3-dal/auth-api";

const initState = {} as RecoveryType
type RecoveryType = {
    info: string;
    error?: string;
}


export const passwordRecoveryReducer = (state: RecoveryType = initState, action: PasswordRecoveryActionType): RecoveryType => {
    switch (action.type) {
        case 'SET-RECOVERY-INFO':
            return {...state, info: action.info}
        case "SET-RECOVERY-ERROR":
            return {...state, error: action.error}
        default:
            return state
    }
}

export const setRecoveryInfoAC = (info: string) => {
    return ({type: 'SET-RECOVERY-INFO', info} as const)
}
export const setRecoveryErrorAC = (error: string) => {
    return ({type: 'SET-RECOVERY-ERROR', error} as const)
}

export const setRecoveryTC = (email: string) => (dispatch: Dispatch<PasswordRecoveryActionType>) => {
    const forgotData: RecoverPassRequestType = {
        email: email,
        from: `test-front-admin <ai73a@yandex.by>`,
        message: `<div style="background-color: lime; padding: 15px">
                    password recovery link: 
                    <a href='http://localhost:3000/friday-memory-cards-project#/set-new-password/$token$'>link</a>
                  </div>`
    }
    authAPI.forgot(forgotData).then((res) => {
        dispatch(setRecoveryInfoAC(res.data.info))
    })
}
export type RecoverPassRequestType = {
    email: string;
    from: string;
    message: string;
}

//types
export type PasswordRecoveryActionType =
  | ReturnType<typeof setRecoveryInfoAC>
  | ReturnType<typeof setRecoveryErrorAC>