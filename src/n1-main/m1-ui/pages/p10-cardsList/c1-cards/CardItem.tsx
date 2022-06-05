import React from 'react';
import {CardType} from "../../../../m2-bll/cardsReducer";
import SuperButton from "../../../common/c2-SuperButton/SuperButton";
import s from './cardItem.module.css';

type CardItemType = {
    card: CardType;
    deleteCard: (cardId: string) => void;
    updateCard: (cardId: string) => void;
}
export const CardItem: React.FC<CardItemType> = ({card, deleteCard, updateCard}) => {

    return (
        <div>
            <div className={s.cardItemContainer}>
                <div className={s.nameColumn}>{card.question}</div>
                <div className={s.nameColumn}>{card.answer}</div>
                <div className={s.updateColumn}>{card.updated}</div>
                <div className={s.actionsColumn}>{card.grade}</div>
                <div className={s.buttonBlock}>
                    <SuperButton onClick={() => {
                        updateCard(card._id)
                    }} title={'edit'} className={s.cardEditButton}/>
                    <SuperButton onClick={() => {
                        deleteCard(card._id)
                    }} title={'delete'} className={s.cardDeleteButton}/>
                </div>
            </div>
        </div>
    );
};


// export const CardItem = () => {
//   return (
//     <div>
//       <div className={s.cardItemContainer}>
//         <div className={s.nameColumn}>Where the russian ship was sent?</div>
//         <div className={s.nameColumn}>russian ship was sent to...</div>
//         <div className={s.updateColumn}>04.06.2022</div>
//         <div className={s.actionsColumn}>☆☆☆☆☆</div>
//       </div>
//     </div>
//   );
// };