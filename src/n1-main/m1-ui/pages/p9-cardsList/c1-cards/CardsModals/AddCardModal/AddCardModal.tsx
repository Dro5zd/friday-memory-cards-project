import React, {useState} from 'react';
import {ModalEdited} from "../../../../../common/c14-Modal/ModalEdited";
import SuperInputText from "../../../../../common/c1-SuperInputText/SuperInputText";
import SuperButton from "../../../../../common/c2-SuperButton/SuperButton";
import {useTypedDispatch} from "../../../../../../m2-bll/store";
import {createNewCardTC} from "../../../../../../m2-bll/cardsReducer";
import s from "../../../../p8-packsList/p1-packs/PackModals/Modal.module.css";

interface IAddCardModal {
    closeModal: () => void;
    modalMode: boolean;
    packId: string;
}

export const AddCardModal: React.FC<IAddCardModal> = ({closeModal, modalMode, packId}) => {
    const dispatch = useTypedDispatch();
    const [answer, setAnswer] = useState<string>('');
    const [question, setQuestion] = useState<string>('');
    const newCard = {
        cardsPack_id: packId,
        question: question,
        answer: answer,
    }
    const addNewCardHandler = () => {
        closeModal();
        dispatch(createNewCardTC(newCard))
    }
    return (
        <ModalEdited closeModal={closeModal} modalMode={modalMode}>
          <div className={s.wrapper}>
            <span className={s.title}>Create new Card</span>
          <SuperInputText className={s.packNameInput} placeholder={'Question'} value={question} onChange={(e) => {
            setQuestion(e.currentTarget.value)
          }}/>
          <SuperInputText className={s.packNameInput} placeholder={'Answer'} value={answer} onChange={(e) => {
            setAnswer(e.currentTarget.value)
          }}/>
         <div className={s.btnWrapper}>
           <SuperButton className={s.saveButton} title={'Add'} onClick={addNewCardHandler}/>
           <SuperButton className={s.cancelButton} title={'Cancel'} onClick={closeModal}/>
         </div>
          </div>
        </ModalEdited>
    );
};
