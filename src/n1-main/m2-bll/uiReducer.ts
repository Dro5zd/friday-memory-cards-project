

const initState = {
    mode: false
}

type InitStateType = {
    mode: boolean
}

export const uiReducer = (state: InitStateType = initState, action: ActionsType): InitStateType  => {
    switch (action.type) {
        case 'CHANGE-THEME':
            return {...state, mode: action.mode}
        default:
            return state
    }
}

export const changeThemeAC = (mode: boolean) => {
    return ({type: 'CHANGE-THEME', mode} as const)
}

type ActionsType =
    | ReturnType<typeof changeThemeAC>