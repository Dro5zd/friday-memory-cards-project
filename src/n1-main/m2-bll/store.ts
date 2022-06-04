import {AnyAction, applyMiddleware, combineReducers, createStore} from 'redux';
import {registerReducer} from './registerReducer';
import {profileReducer} from './profileReducer';
import {passwordRecoveryReducer} from './passwordRecoveryReducer';
import {newPasswordReducer} from './newPasswordReducer';
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import thunk, { ThunkDispatch } from 'redux-thunk';
import {appReducer} from "./appReducer";
import {loginReducer} from "./loginReducer";
import {uiReducer} from './uiReducer';
import {packsReducer} from "./packsReducer";

const reducers = combineReducers({
    auth: loginReducer,
    register: registerReducer,
    profile: profileReducer,
    passwordRecovery: passwordRecoveryReducer,
    newPassword: newPasswordReducer,
    app: appReducer,
    ui: uiReducer,
    packs: packsReducer,
})

const store = createStore(reducers, applyMiddleware(thunk))

export default store

export type AppStoreType = ReturnType<typeof reducers>
export type TypedDispatch = ThunkDispatch<AppStoreType, any, AnyAction>;
export const useTypedDispatch = () => useDispatch<TypedDispatch>();
export const useTypedSelector: TypedUseSelectorHook<AppStoreType> = useSelector;

// @ts-ignore
window.store = store // for dev