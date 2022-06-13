import React from 'react';
import {CardType} from '../../../../../m2-bll/cardsReducer';
import s from './cardItem.module.css';
import {MainRating} from "../../../../common/c12-Rating/Rating";
import {useTypedSelector} from '../../../../../m2-bll/store';
import edit from '../../../../../../assets/img/sliders.svg'
import learn from "../../../../../../assets/img/bookOpen.svg";
import trash from "../../../../../../assets/img/trash.svg";
import moment from 'moment';
import {useModalHandler} from "../../../../../utils/use-modal-handler";
import {DeleteCardModal} from "../CardsModals/DeleteCardModal/DeleteCardModal";
import {EditCardModal} from "../CardsModals/EditCardModal/EditCardModal";

type CardItemType = {
  card: CardType;
  isOwner: boolean;
}
export const CardItem: React.FC<CardItemType> = ({card, isOwner}) => {
  const {modal: delete_modal, toggleModal: toggle_delete_modal} = useModalHandler()
  const {modal: edit_modal, toggleModal: toggle_edit_modal} = useModalHandler()

  return (
    <>
      <DeleteCardModal cardId={card._id} packId={card.cardsPack_id} closeModal={toggle_delete_modal}
                       modalMode={delete_modal}/>
      <EditCardModal initialQuestion={card.question} initialAnswer={card.answer} cardId={card._id}
                     packId={card.cardsPack_id} closeModal={toggle_edit_modal} modalMode={edit_modal}/>
      <tr className={s.cardItemContainer}>
        <td className={s.questionColumn}>{card.question}</td>
        <td className={s.answerColumn}>{card.answer}</td>
        <td className={s.updateColumn}>{moment(card.updated).format('DD.MM.YYYY HH:mm')}</td>
        <td className={s.gradeColumn}><MainRating value={card.grade}/></td>
        <div className={s.buttonBlock}>
          {isOwner && <div className={s.deleteWrapper} onClick={toggle_delete_modal}>
            <img className={s.packDeleteIcon} src={trash} alt="delete"/></div>}
          {isOwner && <div className={s.editeWrapper} onClick={toggle_edit_modal}>
              <img className={s.packEditIcon} src={edit} alt="edit"/></div>}

          <div className={s.learnWrapper} onClick={() => {
          }}>
            <img className={s.packLearnIcon} src={learn} alt="learn"/>
          </div>
        </div>
      </tr>
    </>
  );
};