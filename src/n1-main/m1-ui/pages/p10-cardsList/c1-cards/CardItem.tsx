import React from 'react';
import s from './cardItem.module.css'
import {CardType} from "../../../../m2-bll/cardsReducer";
import SuperButton from "../../../common/c2-SuperButton/SuperButton";

type CardItemType = {
    card: CardType;
    deleteCard: (cardId: string) => void;
    updateCard: (cardId: string) => void;
}
export const CardItem: React.FC<CardItemType> = ({card, deleteCard, updateCard}) => {

    return (
        <div>
            <div className={s.cardContainer}>
                <div className={s.values}>{card.question}</div>
                <div className={s.values}>{card.answer}</div>
                <div className={s.values}>{card.updated}</div>
                <div className={s.values}>{card.grade}</div>
                <div className={s.buttonBlock}>
                    <SuperButton onClick={() => {
                        deleteCard(card._id)
                    }} title={'delete'} className={s.cardButton}/>
                    <SuperButton onClick={() => {
                        updateCard(card._id)
                    }} title={'edit'} className={s.cardButton}/>
                </div>
            </div>
        </div>
    );
};