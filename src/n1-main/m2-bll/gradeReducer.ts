const initState = {
    _id: '',
    cardsPack_id: '',
    card_id: '',
    user_id: '',
    grade: 3,
    shots: 1
} as InitStateType

export const gradeReducer = (state: InitStateType = initState, action: GradeReducerActionType): InitStateType => {
    switch (action.type) {
        case 'SET-CARD-GRADE':
            return {...state, grade: action.grade, card_id: action.card_id};

        default:
            return state;
    }
};
//actions
export const setCardGradeAC = (grade: GradeType, card_id: string) => ({
    type: 'SET-CARD-GRADE',
    grade,
    card_id
} as const)


//types
export type InitStateType = {
    _id: string
    cardsPack_id: string
    card_id: string
    user_id: string
    grade: GradeType
    shots: number
}

type GradeType = 1 | 2 | 3 | 4 | 5

export type GradeReducerActionType =
    | ReturnType<typeof setCardGradeAC>
