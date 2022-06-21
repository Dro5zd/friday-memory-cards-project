import React from 'react';
import {CardType} from '../../../../../m2-bll/cardsReducer';
import s from './cardItem.module.css';
import {MainRating} from '../../../../common/c12-Rating/Rating';
import trash from '../../../../../../assets/img/trash.svg'
import edit from '../../../../../../assets/img/sliders.svg'
import learn from '../../../../../../assets/img/bookOpen.svg'
import moment from 'moment';

type CardItemType = {
    card: CardType;
    isOwner: boolean;
    openEditModalHandler: (packId: string, cardId: string, question: string, answer: string) => void
    openDeleteModalHandler: (packId: string, cardId: string) => void
    openLearnModalHandler: (question: string, answer: string, questionImg: string, answerImg: string) => void
}
export const CardItem: React.FC<CardItemType> = ({
                                                     card,
                                                     isOwner,
                                                     openEditModalHandler,
                                                     openDeleteModalHandler,
                                                     openLearnModalHandler
                                                 },
                                                ) => {

    const openEditModal = () => openEditModalHandler(card.cardsPack_id, card._id, card.question, card.answer)
    const openDeleteModal = () => openDeleteModalHandler(card.cardsPack_id, card._id)
    const openLearnModal = () => openLearnModalHandler(card.question, card.answer, card.questionImg, card.answerImg)

    return (
        <tr className={s.cardItemContainer}>
            <td className={s.questionColumn}>{card.question} {card.questionImg && <img className={s.qImg} src={card.questionImg} alt=""/>}</td>
            <td className={s.answerColumn}>{card.answer} {card.answerImg && <img className={s.aImg} src={card.answerImg} alt=""/>}</td>
            <td className={s.updateColumn}>{moment(card.updated).format('DD.MM.YYYY HH:mm')}</td>
            <td className={s.gradeColumn}><MainRating value={card.grade}/></td>
            <td className={s.buttonBlock}>
                {isOwner && <div className={s.deleteWrapper} onClick={openDeleteModal}>
                    <img className={s.packDeleteIcon} src={trash} alt="delete"/></div>}
                {isOwner && <div className={s.editeWrapper} onClick={openEditModal}>
                    <img className={s.packEditIcon} src={edit} alt="edit"/></div>}
                <div className={s.learnWrapper} onClick={openLearnModal} >
                    <img className={s.packLearnIcon} src={learn} alt="learn"/>
                </div>
            </td>
        </tr>
    );
};