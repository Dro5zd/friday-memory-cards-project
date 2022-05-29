import {AnyAction, applyMiddleware, combineReducers, createStore} from 'redux';
import {loginReducer} from './loginReducer';
import {registerReducer} from './registerReducer';
import {profileReducer} from './profileReducer';
import {passwordRecoveryReducer} from './passwordRecoveryReducer';
import {newPasswordReducer} from './newPasswordReducer';
import {testReducer} from './testReducer';
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import thunk, { ThunkDispatch } from 'redux-thunk';

const reducers = combineReducers({
    auth: loginReducer,
    register: registerReducer,
    profile: profileReducer,
    passwordRecovery: passwordRecoveryReducer,
    newPassword: newPasswordReducer,
    test: testReducer
})

const store = createStore(reducers, applyMiddleware(thunk))

export default store

export type AppStoreType = ReturnType<typeof reducers>
export type TypedDispatch = ThunkDispatch<AppStoreType, any, AnyAction>;
export const useTypedDispatch = () => useDispatch<TypedDispatch>();
export const useTypedSelector: TypedUseSelectorHook<AppStoreType> = useSelector;

// @ts-ignore
window.store = store // for dev