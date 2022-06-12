import React, {useState} from 'react';
import {CardType, getCardsTC} from '../../../../../m2-bll/cardsReducer';
import s from './cardItem.module.css';
import {MainRating} from "../../../../common/c12-Rating/Rating";
import {useTypedDispatch, useTypedSelector} from '../../../../../m2-bll/store';
import edit from '../../../../../../assets/img/slidersBlack.png'
import editWhite from "../../../../../../assets/img/slidersWhite.png";
import learn from "../../../../../../assets/img/bookOpenBlack.png";
import learnWhite from "../../../../../../assets/img/bookOpenWhite.png";
import trash from "../../../../../../assets/img/trashBlack.png";
import trashWhite from "../../../../../../assets/img/trashWhite.png";
import moment from 'moment';
import {setCardGradeTC} from '../../../../../m2-bll/gradeReducer';

type CardItemType = {
  card: CardType;
  deleteCard: (cardId: string, packId: string) => void;
  updateCard: (cardId: string, packId: string) => void;
  isOwner: boolean;
}
export const CardItem: React.FC<CardItemType> = ({card, deleteCard, updateCard, isOwner}) => {
    const dispatch = useTypedDispatch();
  const mode = useTypedSelector(state => state.ui.mode)

    const addRating = (value: number) => {
        dispatch(setCardGradeTC( {grade: value, card_id: card._id}))
        dispatch(getCardsTC(card.cardsPack_id))
    }

    return (
      <tr className={s.cardItemContainer}>
        <td className={s.questionColumn}>{card.question}</td>
        <td className={s.answerColumn}>{card.answer}</td>
        <td className={s.updateColumn}>{moment(card.updated).format( 'MM.DD.YYYY, HH:mm')}</td>

        <td className={s.gradeColumn}><MainRating value={card.grade} addRating={addRating}/></td>
        <div className={s.buttonBlock}>
          <div className={s.learnWrapper} onClick={() => {}}>
            <img className={s.packLearnIcon} src={mode ? learn : learnWhite} alt="learn"/>
          </div>
          {isOwner && <div className={s.editeWrapper} onClick={() => {updateCard(card._id, card.cardsPack_id)}}>
                  <img className={s.packEditIcon} src={mode ? edit : editWhite} alt="edit"/></div>}
          {isOwner && <div className={s.deleteWrapper} onClick={() => {deleteCard(card._id, card.cardsPack_id)}}>
                  <img className={s.packDeleteIcon} src={mode ? trash : trashWhite} alt="delete"/></div>}
        </div>
      </tr>
  );
};