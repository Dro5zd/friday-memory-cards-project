import {AppThunk} from "./store";
import {cardsAPI, PostCardDataType} from "../m3-dal/cards-api";
import {serverErrorHandler} from "../utils/serverErrorHandler";
import {setStatusAC} from "./appReducer";

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
            user_id: '1234',
            updated: '04.06.2022',
        }
    ],
    cardsTotalCount: 0,
    maxGrade: 1,
    minGrade: 0,
    packUserId: '1234',
    page: 1,
    pageCount: 10,
};

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
  _id: string;
  cardsPack_id: string;

  answer: string;
  question: string;
  grade: number;
  shots: number;

  user_id: string;
  created: string;
  updated: string;

};

export const cardsReducer = (state = initialState, action: CardsReducerActionTypes): CardsReducerInitialStateType => {
    switch (action.type) {
        case "cards/SET-CARDS-STATE": {
            return {...action.data}
        }
        default:
            return state
    }
}

export const setCardsStateAC = (data: CardsReducerInitialStateType) => ({type: 'cards/SET-CARDS-STATE', data} as const)
export type CardsReducerActionTypes = ReturnType<typeof setCardsStateAC>;

export const getCardsTC = (cardsPack_id: string): AppThunk => async (dispatch, getState) => {
    const currentPage = getState().app.cardsCurrentPage;
    const pageCount = getState().app.cardsPortionValue;
    const questionValue = getState().sort.cardsQuestionValue;
    const answerValue = getState().sort.cardsAnswerValue;
    const sortCards = getState().sort.sortCards
    dispatch(setStatusAC('loading'))
    try {
        const response = await cardsAPI.getCards({
            cardsPack_id: cardsPack_id,
            pageCount: pageCount,
            page: currentPage,
            cardQuestion: questionValue,
            cardAnswer: answerValue,
            sortCards: sortCards
        });
        dispatch(setCardsStateAC(response.data))
        dispatch(setStatusAC('succeeded'))
    } catch (e: any) {
        serverErrorHandler('Sorry, not able to get cards, that You are looking for, try again', dispatch)
    }
}
export const createNewCardTC = (newCard: PostCardDataType): AppThunk => async (dispatch, getState) => {
    dispatch(setStatusAC('loading'))
    const packId = newCard.cardsPack_id
    try {
        await cardsAPI.postCard(newCard)
        dispatch(getCardsTC(packId))
        dispatch(setStatusAC('succeeded'))
    } catch (e: any) {
        //console.log(e.response.data.error)
        serverErrorHandler('Sorry, not able to create new card, try again', dispatch)
    }
}
export const deleteCardTC = (id: string, packId: string): AppThunk => async (dispatch) => {
  dispatch(setStatusAC('loading'))
  try {
    await cardsAPI.deleteCard(id)
    dispatch(getCardsTC(packId))
    dispatch(setStatusAC('succeeded'))
  } catch (e: any) {
    serverErrorHandler('Sorry, not able to delete card, try again', dispatch)
  }
}
export const updateCardTC = (cardId: string, packId: string, question: string, answer: string): AppThunk => async (dispatch) => {
  dispatch(setStatusAC('loading'))
  try {
    await cardsAPI.updateCard({_id: cardId, question, answer})
    dispatch(getCardsTC(packId))
    dispatch(setStatusAC('succeeded'))
  } catch (e: any) {
    serverErrorHandler('Sorry, not able to edit card, try again', dispatch)
  }
}