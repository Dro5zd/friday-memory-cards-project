import React from 'react';
import { ModalEdited } from '../../../../../common/c14-Modal/ModalEdited';
import SuperButton from "../../../../../common/c2-SuperButton/SuperButton";
import s from './OpenCardModal.module.css'

interface IOpenCardModal {
    closeModal: () => void;
    modalMode: boolean;
    question: string;
    answer: string;
}

export const LearnCardModal: React.FC<IOpenCardModal> = ({closeModal, modalMode, answer, question}) => {
    return (
        <ModalEdited closeModal={closeModal} modalMode={modalMode}>
            <div className={s.container}>
                <div className={s.block}>
                    <div className={s.title}>Question</div>
                    <div className={s.text}>{question}</div>
                </div>
                <div className={s.block}>
                    <div className={s.title}>Answer</div>
                    <div className={s.text}>{answer}</div>
                </div>
                <SuperButton className={s.cancelButton} onClick={closeModal} title={'Close'}/>
            </div>
        </ModalEdited>
    );
};

