import {Dispatch} from "redux";
import {authAPI, LoginParamsType} from "../m3-dal/auth-api";

const LOGIN = 'LOGIN'

const initState = {} as InitStateType

export const loginReducer = (state: AppStoreType = initState, action: LoginReducerType): AppStoreType => {
  switch (action.type) {
    case LOGIN:
      return {
        ...action.login
      }
    default:
      return state
  }
}

type LoginReducerType = ReturnType<typeof loginAC>

export const loginAC = (login: InitStateType) => ({
  type: LOGIN,
    login
} as const)

export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
  authAPI.loginPost(data)
    .then((res) => {
      dispatch(loginAC(res.data))
    })
    .catch((e) => {
      const error = e.res ? e.res.data.error : (e.message + ', more details in the console')
      dispatch(loginAC(error))
    })
}


// types
type AppStoreType = typeof initState

type InitStateType = {
  _id: string;
  email: string;
  name: string;
  avatar?: string;
  publicCardPacksCount: number; // количество колод

  created: Date;
  updated: Date;
  isAdmin: boolean;
  verified: boolean; // подтвердил ли почту
  rememberMe: boolean;

  error?: string;
}

