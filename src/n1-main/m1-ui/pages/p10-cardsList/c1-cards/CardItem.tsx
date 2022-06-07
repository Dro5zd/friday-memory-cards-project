import React from 'react';
import {CardType} from "../../../../m2-bll/cardsReducer";
import SuperButton from "../../../common/c2-SuperButton/SuperButton";
import s from './cardItem.module.css';
import {MainRating} from "../../../common/c12-Rating/Rating";

type CardItemType = {
    card: CardType;
    deleteCard: (cardId: string, packId: string) => void;
    updateCard: (cardId: string, packId: string) => void;
    isOwner: boolean;
}
export const CardItem: React.FC<CardItemType> = ({card, deleteCard, updateCard, isOwner}) => {

    return (
        <div>
            <div className={s.cardItemContainer}>
                <div className={s.nameColumn}>{card.question}</div>
                <div className={s.nameColumn}>{card.answer}</div>
                <div className={s.updateColumn}>{card.updated}</div>
                <div className={s.actionsColumn}><MainRating value={card.grade} addRating={()=>{}}/></div>
                <div className={s.buttonBlock}>
                    {isOwner && <SuperButton disabled={!isOwner} onClick={() => {
                        updateCard(card._id, card.cardsPack_id)
                    }} title={'edit'} className={s.cardEditButton}/>}
                    <SuperButton title={'Learn'}/>
                    {isOwner && <SuperButton disabled={!isOwner} onClick={() => {
                        deleteCard(card._id, card.cardsPack_id)
                    }} title={'delete'} className={s.cardDeleteButton}/>}
                </div>
            </div>
        </div>
    );
};