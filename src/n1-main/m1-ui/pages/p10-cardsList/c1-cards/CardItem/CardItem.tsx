import React from 'react';
import {CardType} from '../../../../../m2-bll/cardsReducer';
import s from './cardItem.module.css';
import {MainRating} from "../../../../common/c12-Rating/Rating";
import {useTypedSelector} from '../../../../../m2-bll/store';
import edit from '../../../../../../assets/img/slidersBlack.png'
import editWhite from "../../../../../../assets/img/slidersWhite.png";
import learn from "../../../../../../assets/img/bookOpenBlack.png";
import learnWhite from "../../../../../../assets/img/bookOpenWhite.png";
import trash from "../../../../../../assets/img/trashBlack.png";
import trashWhite from "../../../../../../assets/img/trashWhite.png";
import moment from 'moment';
import {useModalHandler} from "../../../../../utils/use-modal-handler";
import {DeleteCardModal} from "../CardsModals/DeleteCardModal/DeleteCardModal";
import {EditCardModal} from "../CardsModals/EditCardModal/EditCardModal";

type CardItemType = {
    card: CardType;
    isOwner: boolean;
}
export const CardItem: React.FC<CardItemType> = ({card, isOwner}) => {
    const mode = useTypedSelector(state => state.ui.mode)
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
                <td className={s.updateColumn}>{moment(card.updated).format('MM.DD.YYYY, HH:mm')}</td>
                <td className={s.gradeColumn}><MainRating value={card.grade}/></td>
                <div className={s.buttonBlock}>
                    <div className={s.learnWrapper} onClick={() => {
                    }}>
                        <img className={s.packLearnIcon} src={mode ? learn : learnWhite} alt="learn"/>
                    </div>
                    {isOwner && <div className={s.editeWrapper} onClick={toggle_edit_modal}>
                        <img className={s.packEditIcon} src={mode ? edit : editWhite} alt="edit"/></div>}
                    {isOwner && <div className={s.deleteWrapper} onClick={toggle_delete_modal}>
                        <img className={s.packDeleteIcon} src={mode ? trash : trashWhite} alt="delete"/></div>}
                </div>
            </tr>
        </>
    );
};