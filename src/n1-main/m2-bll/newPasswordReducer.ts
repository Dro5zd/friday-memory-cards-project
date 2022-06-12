import {Dispatch} from "redux";
import {authAPI, NewPassParamsType} from "../m3-dal/auth-api";
import {setStatusAC} from "./appReducer";

const SET_NEW_PASS_ERROR = 'SET-NEW-PASS-ERROR'
const SET_PASS_CHANGED = 'SET-PASS-CHANGED'

const initState = {
  error: '',
  passChanged: false
}

export const newPasswordReducer = (state: InitStateType = initState, action: NewPassActionsType): InitStateType => {
  switch (action.type) {

    case SET_NEW_PASS_ERROR:
      return {
        ...state, error: action.error
      }
    case SET_PASS_CHANGED:
      return {
        ...state,
        passChanged: action.passChanged
      }

    default:
      return state
  }
}

// actions
export const setNewPassErrorAC = (error: string) => ({type: SET_NEW_PASS_ERROR, error} as const)
export const setPassChangedAC = (passChanged: boolean) => ({type: SET_PASS_CHANGED, passChanged} as const)

//thunk
export const newPassTC = (newPassData: NewPassParamsType) => (dispatch: Dispatch) => {
  dispatch(setStatusAC('loading'))
  authAPI.newPass(newPassData)
    .then(() => {
      dispatch(setPassChangedAC(true))
    })
    .catch((e) => {
      dispatch(setNewPassErrorAC(e.message))
    })
    .finally(() => {
      dispatch(setStatusAC('succeeded'))
    })
}

// types
export type NewPassActionsType =
  | ReturnType<typeof setNewPassErrorAC>
  | ReturnType<typeof setPassChangedAC>

type InitStateType = typeof initState