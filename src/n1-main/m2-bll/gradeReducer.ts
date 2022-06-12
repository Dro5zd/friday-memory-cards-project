import {Dispatch} from 'redux';
import {cardsAPI, UpdatedGradeType} from '../m3-dal/cards-api';

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
export const setCardGradeAC = (grade: number, card_id: string) => ({
    type: 'SET-CARD-GRADE',
    grade,
    card_id
} as const)


export const setCardGradeTC = (data: UpdatedGradeType) => (dispatch: Dispatch) => {
    cardsAPI.updateCardGrade(data)
        .then((res) => {
        })
}


//types
export type InitStateType = {
    _id: string
    cardsPack_id: string
    card_id: string
    user_id: string
    grade: number
    shots: number
}

// type GradeType = 0 | 1 | 2 | 3 | 4 | 5

export type GradeReducerActionType =
    | ReturnType<typeof setCardGradeAC>
