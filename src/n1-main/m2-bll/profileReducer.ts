import {changeProfileRequestType, profileAPI} from '../m3-dal/profile-api';
import {Dispatch} from 'redux';

const initState = {
    name: '',
    avatar: ''
}

export const profileReducer = (state: changeProfileRequestType = initState, action: ProfileActionsType): changeProfileRequestType  => {
    switch (action.type) {
        case 'UPDATE-PROFILE':
            return {name: action.newName, avatar: action.newAvatar}

        default:
            return state
    }
}

export const updateProfileAC = (newName: string, newAvatar: string ) => {
    return ({type: 'UPDATE-PROFILE', newName, newAvatar} as const)
}

export const updateProfileTC = (data: changeProfileRequestType) => {
    return (dispatch: Dispatch<ProfileActionsType>) => {
        profileAPI.changeProfile(data)
            .then(res => {
                dispatch(updateProfileAC(res.data.updatedUser.name, res.data.updatedUser.avatar))
            })
    }
}

export type ProfileActionsType =
    | ReturnType<typeof updateProfileAC>