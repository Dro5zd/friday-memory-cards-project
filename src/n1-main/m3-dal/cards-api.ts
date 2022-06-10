import axios from 'axios';

const instance = axios.create({
    // baseURL: 'http://localhost:7542/2.0/',
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
});

export const cardsAPI = {
    getCards(uriParams: GetCardsDataType) {
        return instance.get('/cards/card', {params: uriParams})
    },
    postCard(newCard: PostCardDataType) {
        return instance.post('/cards/card', {card: newCard})
    },
    deleteCard(id: string) {
        return instance.delete(`/cards/card?id=${id}`)
    },
    updateCard(cardData: UpdateCardDataType) {
        return instance.put('/cards/card', {card: cardData})
    }
};
export type GetCardsDataType = {
    cardAnswer?: string;
    cardQuestion?: string;
    cardsPack_id: string;
    min?: number;
    max?: number;
    sortCards?: string; //0|1+fieldName
    page?: number;
    pageCount?: number;
};
export type PostCardDataType = {
    cardsPack_id: string;
    question?: string; // если не отправить будет таким "no question"
    answer?: string; // если не отправить будет таким "no question"
    grade?: number; // 0-5
    shots?: number; // attempts
    answerImg?: string;
    questionImg?: string;
    questionVideo?: string;
    answerVideo?: string;
};
export type UpdateCardDataType = {
    _id: string;
    question?: string;
    comments?: string;
}