import React, {useState} from 'react';
import {ModalEdited} from "../../../../../common/c15-Modal/ModalEdited";
import SuperInputText from "../../../../../common/c1-SuperInputText/SuperInputText";
import SuperButton from "../../../../../common/c2-SuperButton/SuperButton";
import {useTypedDispatch} from "../../../../../../m2-bll/store";
import {createNewCardTC} from "../../../../../../m2-bll/cardsReducer";

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
            <SuperInputText placeholder={'Question'} value={question} onChange={(e) => {
                setQuestion(e.currentTarget.value)
            }}/>
            <SuperInputText placeholder={'Answer'} value={answer} onChange={(e) => {
                setAnswer(e.currentTarget.value)
            }}/>
            <SuperButton title={'Cancel'} onClick={closeModal}/>
            <SuperButton title={'Add'} onClick={addNewCardHandler}/>
        </ModalEdited>
    );
};
