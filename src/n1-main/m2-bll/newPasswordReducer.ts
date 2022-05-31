import {Dispatch} from "redux";
import {authAPI, NewPassParamsType} from "../m3-dal/auth-api";

const NEW_PASS = 'NEW-PASS'
const SET_NEW_PASS_ERROR = 'SET-NEW-PASS-ERROR'

const initState = {
  newPass: '',
  error: ''
}

export const newPasswordReducer = (state: InitStateType = initState, action: NewPassActionsType): InitStateType => {
  switch (action.type) {
    case NEW_PASS:
      return {...state, newPass: action.newPass}

    case SET_NEW_PASS_ERROR:
      return {
        ...state, error: action.error
      }

    default:
      return state
  }
}
// actions
export const newPassAC = (newPass: string) => ({type: NEW_PASS, newPass} as const)
export const setNewPassErrorAC = (error: string) => ({type: SET_NEW_PASS_ERROR, error} as const)

//thunk
export const newPassTC = (newPassData: NewPassParamsType) => (dispatch: Dispatch) => {
  authAPI.newPass(newPassData)
    .then((res) => {
      dispatch(newPassAC(res.data.newPass))
    })
    .catch((e) => {
      dispatch(setNewPassErrorAC(`Error: ${e.message}`))
    })
}

// types
export type NewPassActionsType =
  | ReturnType<typeof newPassAC>
  | ReturnType<typeof setNewPassErrorAC>

type InitStateType = typeof initState