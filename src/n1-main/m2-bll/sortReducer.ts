const initState = {
    user_id: '',
    sortPacks: '0updated',
    packMinValue: 0,
    packMaxValue: 3000
} as InitStateType

export const sortReducer = (state: InitStateType = initState, action: SortReducerActionType): InitStateType => {
    switch (action.type) {

        case 'SET-MY-ALL-FILTER':
            return {...state, user_id: action.user_id}

        case 'SET-UPDATED-FILTER':
            return {...state, sortPacks: action.sortPacks}

        case 'SET-RANGE-VALUE':
            return {...state, packMinValue: action.payload.value1, packMaxValue: action.payload.value2 }

        default:
            return state
    }
}

//actions
export const setMyAllFilterAC = (user_id: string) => ({
    type: 'SET-MY-ALL-FILTER',
    user_id
} as const)

export const setUpdatedFilterAC = (sortPacks: string) => ({
    type: 'SET-UPDATED-FILTER',
    sortPacks
} as const)

export const setRangeValueAC = (value1: number, value2: number) => ({
    type: 'SET-RANGE-VALUE',
    payload: {value1, value2}
} as const)


//types
export type InitStateType = {
    user_id: string
    sortPacks: string
    packMinValue: number
    packMaxValue: number
}

export type SortReducerActionType =
    | ReturnType<typeof setMyAllFilterAC>
    | ReturnType<typeof setUpdatedFilterAC>
    | ReturnType<typeof setRangeValueAC>