import {Dispatch} from "redux";
import {authAPI, LoginParamsType} from "../m3-dal/auth-api";
import {setIsAuthorisedAC, setStatusAC} from "./appReducer";

const LOGIN = 'LOGIN'
const SET_LOGIN_ERROR = 'SET-LOGIN-ERROR'

const initState = {} as InitStateType

export const loginReducer = (state: LoginStateType = initState, action: LoginReducerType): LoginStateType => {
  switch (action.type) {
    case LOGIN:
      return {...action.data}

    case SET_LOGIN_ERROR:
      return {...state, error: action.error}

    default:
      return state
  }
}

// actions
export const loginAC = (data: InitStateType) => ({
  type: LOGIN,
  data
} as const)
export const setLoginErrorAC = (error: string) => ({
  type: SET_LOGIN_ERROR,
  error
} as const)

// thunk
export const loginFormTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
  dispatch(setStatusAC('loading'))
  authAPI.loginPost(data)
    .then((res) => {
      dispatch(setIsAuthorisedAC(true))
      dispatch(loginAC(res.data))
      dispatch(setStatusAC('succeeded'))
    })
    .catch((e) => {
      dispatch(setLoginErrorAC(e.message))
      // const error = e.res ? e.res.data.error : (e.message + ', more details in the console')
      // console.log(error)
      // console.log('Error: ', {...e})
    })
}

// types
export type LoginReducerType =
  | ReturnType<typeof loginAC>
  | ReturnType<typeof setLoginErrorAC>
  | ReturnType<typeof setStatusAC>

type LoginStateType = typeof initState
type InitStateType = {
  _id: string;
  email: string;
  name: string;
  avatar: string;
  publicCardPacksCount: number; // количество колод

  created: Date;
  updated: Date;
  isAdmin: boolean;
  verified: boolean; // подтвердил ли почту
  rememberMe: boolean;

  error?: string;
}
