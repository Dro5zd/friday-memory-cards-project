import {AnyAction, applyMiddleware, combineReducers, createStore} from 'redux';
import {registerReducer, RegistrationActionType} from './registerReducer';
import {ProfileActionsType, profileReducer} from './profileReducer';
import {PasswordRecoveryActionType, passwordRecoveryReducer} from './passwordRecoveryReducer';
import {NewPassActionsType, newPasswordReducer} from './newPasswordReducer';
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import thunk, {ThunkDispatch, ThunkAction} from 'redux-thunk';
import {AppActionType, appReducer} from "./appReducer";
import {loginReducer, LoginReducerType} from "./loginReducer";
import {UiActionsType, uiReducer} from './uiReducer';
import {cardPacksReducer, CardPacksType} from "./cardPacksReducer";
import {cardsReducer, CardsReducerActionTypes} from "./cardsReducer";

const reducers = combineReducers({
    auth: loginReducer,
    register: registerReducer,
    profile: profileReducer,
    passwordRecovery: passwordRecoveryReducer,
    newPassword: newPasswordReducer,
    app: appReducer,
    ui: uiReducer,
    packs: cardPacksReducer,
    cards: cardsReducer,
})

const store = createStore(reducers, applyMiddleware(thunk))

export default store

export type AppStoreType = ReturnType<typeof reducers>
export type TypedDispatch = ThunkDispatch<AppStoreType, any, AnyAction>;
export const useTypedDispatch = () => useDispatch<TypedDispatch>();
export const useTypedSelector: TypedUseSelectorHook<AppStoreType> = useSelector;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStoreType, unknown, AppActionsType>;

type AppActionsType =
    | LoginReducerType
    | RegistrationActionType
    | ProfileActionsType
    | PasswordRecoveryActionType
    | NewPassActionsType
    | AppActionType
    | UiActionsType
    | CardPacksType
    | CardsReducerActionTypes


// @ts-ignore
window.store = store // for dev