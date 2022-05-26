const initState = {
    isLoading: false
}

type initStateType = typeof initState

export const authReducer = (state: initStateType = initState, action: loadingACType): initStateType  => {
    switch (action.type) {
        case 'LOADING-ON':
            return {...state, isLoading: !action.isLoading}
        default:
            return state
    }
}

type loadingACType = ReturnType<typeof loadingAC>

export const loadingAC = (isLoading: boolean) => {
    return {type: 'LOADING-ON'as const, isLoading}
}