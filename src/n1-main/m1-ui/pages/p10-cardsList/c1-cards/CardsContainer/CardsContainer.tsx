import React from 'react';
import s from './cardsContainer.module.css';
import {CardItem} from '../CardItem/CardItem';
import {setUpdateCardFilterAC} from '../../../../../m2-bll/sortReducer';
import {deleteCardTC, getCardsTC, updateCardTC} from '../../../../../m2-bll/cardsReducer';
import {useTypedDispatch, useTypedSelector} from '../../../../../m2-bll/store';
import {useParams} from 'react-router-dom';

export const CardsContainer = () => {
    const {urlCardsPackId} = useParams<string>();
    const cards = useTypedSelector(state => state.cards);
    const sortCards = useTypedSelector<string>(state => state.sort.sortCards)
    const userId = useTypedSelector<string>(state => state.auth._id);
    const packUserId = useTypedSelector<string>(state => state.cards.packUserId)
    const dispatch = useTypedDispatch();
    const isOwner = userId === packUserId

    const sortUpdatedCardsHandler = (value: string) => {
        sortCards === `0${value}`
            ? dispatch(setUpdateCardFilterAC(`1${value}`))
            : dispatch(setUpdateCardFilterAC(`0${value}`))
        urlCardsPackId && dispatch(getCardsTC(urlCardsPackId))
    }
    const deleteCard = (cardId: string, packId: string) => {
        dispatch(deleteCardTC(cardId, packId))
    };

    const updateCard = (cardId: string, packId: string) => {
        dispatch(updateCardTC(cardId, packId))
    };

    return (
        <div className={s.packsContainer}>
            <table>
                <thead>
                <tr className={s.packListHeader}>
                    <th className={s.questionTitle}>Question</th>
                    <th className={s.answerTitle}>Answer</th>
                    <th onClick={() => sortUpdatedCardsHandler('updated')} className={s.updateTitle}>Last Updated</th>
                    <th onClick={() => sortUpdatedCardsHandler('grade')} className={s.gradeTitle}>Grade</th>
                    <th className={s.actionsTitle}>Actions</th>
                </tr>
                </thead>
                <tbody>
                {cards.cards.map((card) => {
                    return <CardItem isOwner={isOwner} key={card._id} card={card} deleteCard={deleteCard}
                                     updateCard={updateCard}/>
                })}
                </tbody>
            </table>


        </div>
    );
};