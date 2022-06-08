const initState = {
    user_id: '',
    sortPacks: '0updated',
    packMinValue: 0,
    sortCards: '',
    packMaxValue: 150,
    cardsQuestionValue: '',
    cardsAnswerValue: '',
    packName: ''
} as InitStateType

export const sortReducer = (state: InitStateType = initState, action: SortReducerActionType): InitStateType => {
    switch (action.type) {
        case 'SET-MY-ALL-FILTER':
            return {...state, user_id: action.user_id};
        case 'SET-UPDATED-FILTER':
            return {...state, sortPacks: action.sortPacks}
        case 'SET-UPDATED-CARD-FILTER':
            return {...state, sortCards: action.sortCards}
        case 'SET-RANGE-VALUE':
            return {...state, packMinValue: action.payload.value1, packMaxValue: action.payload.value2};
        case "SET-CARDS-QUESTION-VALUE":
            return {...state, cardsQuestionValue: action.searchValue};
        case "SET-CARDS-ANSWER-VALUE":
            return {...state, cardsAnswerValue: action.searchValue}
        case "SET-PACK-NAME-VALUE":
            return {...state, packName: action.searchValue}
        default:
            return state;
    }
};
//actions
export const setMyAllFilterAC = (user_id: string) => ({
    type: 'SET-MY-ALL-FILTER',
    user_id
} as const)

export const setUpdatedFilterAC = (sortPacks: string) => ({
    type: 'SET-UPDATED-FILTER',
    sortPacks
} as const)

export const setUpdateCardFilterAC = (sortCards: string) => ({
    type: 'SET-UPDATED-CARD-FILTER',
    sortCards
} as const)

export const setRangeValueAC = (value1: number, value2: number) => ({
    type: 'SET-RANGE-VALUE',
    payload: {value1, value2}
} as const)

export const setCardsQuestionValue = (searchValue: string) => ({type: 'SET-CARDS-QUESTION-VALUE', searchValue} as const);
export const setCardsAnswerValue = (searchValue: string) => ({type: 'SET-CARDS-ANSWER-VALUE', searchValue} as const);
export const setPackNameValue = (searchValue: string) => ({type: 'SET-PACK-NAME-VALUE', searchValue} as const);


//types
export type InitStateType = {
    user_id: string;
    sortPacks: string;
    packMinValue: number;
    packMaxValue: number;
    sortCards: string;
    cardsQuestionValue: string;
    cardsAnswerValue: string;
    packName?: string,
}

export type SortReducerActionType =
    | ReturnType<typeof setMyAllFilterAC>
    | ReturnType<typeof setUpdatedFilterAC>
    | ReturnType<typeof setRangeValueAC>
    | ReturnType<typeof setCardsQuestionValue>
    | ReturnType<typeof setCardsAnswerValue>
    | ReturnType<typeof setUpdateCardFilterAC>
    | ReturnType<typeof setPackNameValue>