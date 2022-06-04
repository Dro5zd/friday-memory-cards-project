import {AppThunk} from "./store";
import {cardsAPI, GetCardsDataType, PostCardDataType} from "../m3-dal/cards-api";

const initialState = {
    cards: [
        {
            _id: '1234',
            answer: 'russian ship was sent to...',
            question: 'Where the russian ship was sent?',
            cardsPack_id: '12342',
            grade: 2,
            shots: 2,
            created: 'df2322',
            user_id: '12354f',
            updated: '04.06.2022',
        }
    ],
    cardsTotalCount: 0,
    maxGrade: 1,
    minGrade: 0,
    packUserId: '1234',
    page: 1,
    pageCount: 10,
} as CardsReducerInitialStateType

export type CardsReducerInitialStateType = {
    cards: CardType[];
    cardsTotalCount: number;
    maxGrade: number;
    minGrade: number;
    page: number;
    pageCount: number;
    packUserId: string;
};
export type CardType = {
    answer: string;
    question: string;
    cardsPack_id: string;
    grade: number;
    shots: number;
    user_id: string;
    created: string;
    updated: string;
    _id: string;
};

export const cardsReducer = (state = initialState, action: CardsReducerActionTypes): CardsReducerInitialStateType => {
    switch (action.type) {
        case "SET-CARDS-STATE": {
            return {...action.data}
        }
        default:
            return state
    }
}

export const setCardsStateAC = (data: CardsReducerInitialStateType) => ({type: 'SET-CARDS-STATE', data} as const)
export type CardsReducerActionTypes = ReturnType<typeof setCardsStateAC>

export const getCardsTC = (data: GetCardsDataType): AppThunk => async (dispatch, getState) => {
    try {
        const response = await cardsAPI.getCards(data);
        dispatch(setCardsStateAC(response.data))
    } catch (e: any) {
        console.log(e.response.data.error)
    }
}
export const createNewCardTC = (newCard: PostCardDataType): AppThunk => async (dispatch, getState) => {
    const packId = getState().cards.cards[0].cardsPack_id //NEED TO CHANGE FOR PACK STATE
    try {
        const response = await cardsAPI.postCard(newCard)
        dispatch(getCardsTC({cardsPack_id: packId}))
    } catch (e: any) {
        console.log(e.response.data.error)
    }
}
export const deleteCardTC = (id: string): AppThunk => async (dispatch) => {
    try {
        const response = await cardsAPI.deleteCard(id)
    } catch (e: any) {
        console.log(e.response.data.error)
    }
}
export const updateCardTC = (cardId: string): AppThunk => async (dispatch) => {
    try {
        const response = await cardsAPI.updateCard({_id: cardId})
    } catch (e: any) {
        console.log(e.response.data.error)
    }
}