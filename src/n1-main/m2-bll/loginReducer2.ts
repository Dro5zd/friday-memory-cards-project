import {Dispatch} from "redux";
import {authAPI, LoginParamsType} from "../m3-dal/auth-api";
import {setIsAuthorisedAC} from "./appReducer";

const LOGIN = 'LOGIN'

const initState = {

} as InitStateType

export const loginReducer2 = (state: AppStoreType = initState, action: LoginReducerType): AppStoreType => {
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
      dispatch(setIsAuthorisedAC(true))
      dispatch(loginAC(res.data))
    })
    .catch((e) => {
      const error = e.res ? e.res.data.error : (e.message + ', more details in the console')
    })
}


// types
type AppStoreType = typeof initState

type InitStateType =
  {
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

