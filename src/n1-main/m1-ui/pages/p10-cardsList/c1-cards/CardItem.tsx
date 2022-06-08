import React from 'react';
import {CardType} from "../../../../m2-bll/cardsReducer";
import s from './cardItem.module.css';
import {MainRating} from "../../../common/c12-Rating/Rating";
import {useTypedSelector} from "../../../../m2-bll/store";
import edit from '../../../../../assets/img/sliders.png'
import editWhite from "../../../../../assets/img/slidersWhite.png";
import learn from "../../../../../assets/img/bookOpen.png";
import learnWhite from "../../../../../assets/img/bookOpenWhite.png";
import trash from "../../../../../assets/img/trash.png";
import trashWhite from "../../../../../assets/img/trashWhite.png";
import moment from 'moment';

type CardItemType = {
  card: CardType;
  deleteCard: (cardId: string, packId: string) => void;
  updateCard: (cardId: string, packId: string) => void;
  isOwner: boolean;
}
export const CardItem: React.FC<CardItemType> = ({card, deleteCard, updateCard, isOwner}) => {

  const mode = useTypedSelector(state => state.ui.mode)

  return (
    <div>
      <div className={s.cardItemContainer}>
        <div className={s.questionColumn}>{card.question}</div>
        <div className={s.answerColumn}>{card.answer}</div>
        <div className={s.updateColumn}>{moment(card.updated).format( 'MM.DD.YYYY, HH:mm')}</div>
        <div className={s.gradeColumn}><MainRating value={card.grade} addRating={() => {}}/></div>
        <div className={s.buttonBlock}>
          <div className={s.learnWrapper} onClick={() => {}}>
            <img className={s.packLearnIcon} src={mode ? learn : learnWhite} alt="learn"/>
          </div>
          {isOwner && <div className={s.editeWrapper} onClick={() => {updateCard(card._id, card.cardsPack_id)}}>
                  <img className={s.packEditIcon} src={mode ? edit : editWhite} alt="edit"/></div>}
          {isOwner && <div className={s.deleteWrapper} onClick={() => {deleteCard(card._id, card.cardsPack_id)}}>
                  <img className={s.packDeleteIcon} src={mode ? trash : trashWhite} alt="delete"/></div>}
        </div>
      </div>
    </div>
  );
};

// _______________________________
// _______________________________
// _______________________________
// _______________________________
// _______________________________
// disabled={!isOwner} спросить у Давида за что отвечает этот дизейбл
// _______________________________
// _______________________________
// _______________________________
// _______________________________
// _______________________________