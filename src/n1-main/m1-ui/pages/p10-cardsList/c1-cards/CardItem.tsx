import React from 'react';
import {CardType} from "../../../../m2-bll/cardsReducer";
import SuperButton from "../../../common/c2-SuperButton/SuperButton";
import s from './cardItem.module.css';
import {MainRating} from "../../../common/c12-Rating/Rating";
import {useTypedSelector} from "../../../../m2-bll/store";
import edit from '../../../../../assets/img/sliders.png'
import editWhite from "../../../../../assets/img/slidersWhite.png";
import learn from "../../../../../assets/img/bookOpen.png";
import learnWhite from "../../../../../assets/img/bookOpenWhite.png";
import trash from "../../../../../assets/img/trash.png";
import trashWhite from "../../../../../assets/img/trashWhite.png";

type CardItemType = {
  card: CardType;
  deleteCard: (cardId: string, packId: string) => void;
  updateCard: (cardId: string, packId: string) => void;
  isOwner: boolean;
}
export const CardItem: React.FC<CardItemType> = ({card, deleteCard, updateCard, isOwner}) => {
  const mode = useTypedSelector(state => state.ui.mode)
  // _______________________________
  // _______________________________
  // _______________________________
  // _______________________________
  // _______________________________
  // я начал изменять кнопки в этой компоненте но не закончил
  // так что пока если есть возможгость не ковыряйте ее...
  // скоро закончу ее!!!
  // _______________________________
  // _______________________________
  // _______________________________
  // _______________________________
  // _______________________________
  return (
    <div>
      <div className={s.cardItemContainer}>
        <div className={s.nameColumn}>{card.question}</div>
        <div className={s.nameColumn}>{card.answer}</div>
        <div className={s.updateColumn}>{card.updated}</div>
        <div className={s.actionsColumn}>
          <MainRating value={card.grade} addRating={() => {}}/>
        </div>
        <div className={s.buttonBlock}>
          {
            isOwner &&
              <div onClick={() => {updateCard(card._id, card.cardsPack_id)}}>
                  <img className={s.packEditIcon} src={mode ? edit : editWhite} alt="edit"/>
                  <SuperButton
                      disabled={!isOwner}
                      onClick={() => {updateCard(card._id, card.cardsPack_id)}}
                      className={s.editeWrapper}/>
              </div>
              }
          <div onClick={() => {}}>
            <img className={s.packLearnIcon} src={mode ? learn : learnWhite} alt="learn"/>
            <SuperButton className={s.learnWrapper}/>
          </div>
          {
            isOwner &&
             <div onClick={() => {deleteCard(card._id, card.cardsPack_id)}}>
                 <SuperButton
                     disabled={!isOwner}

                     className={s.deleteWrapper}
                 />
                 <img className={s.packDeleteIcon} src={mode ? trash : trashWhite} alt="delete"/>
             </div>
          }
        </div>
      </div>
    </div>
  );
};