import {combineReducers, createStore} from 'redux';
import {authReducer} from './authReducer';
import {registerReducer} from './registerReducer';
import {profileReducer} from './profileReducer';
import {passwordRecoveryReducer} from './passwordRecoveryReducer';
import {newPasswordReducer} from './newPasswordReducer';
import {testReducer} from './testReducer';


const reducers = combineReducers({
    auth: authReducer,
    register: registerReducer,
    profile: profileReducer,
    passwordRecovery: passwordRecoveryReducer,
    newPassword: newPasswordReducer,
    test: testReducer
})

const store = createStore(reducers)

export default store

export type AppStoreType = ReturnType<typeof reducers>

// @ts-ignore
window.store = store // for dev