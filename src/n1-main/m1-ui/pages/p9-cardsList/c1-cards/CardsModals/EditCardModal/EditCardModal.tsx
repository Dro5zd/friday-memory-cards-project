import React, {useState} from 'react';
import SuperInputText from "../../../../../common/c1-SuperInputText/SuperInputText";
import {ModalEdited} from "../../../../../common/c15-Modal/ModalEdited";
import SuperButton from "../../../../../common/c2-SuperButton/SuperButton";
import {useTypedDispatch} from "../../../../../../m2-bll/store";
import {updateCardTC} from "../../../../../../m2-bll/cardsReducer";

interface IEditCardModal {
    closeModal: () => void;
    modalMode: boolean;
    cardId: string;
    packId: string;
    initialAnswer: string;
    initialQuestion: string;
}

export const EditCardModal: React.FC<IEditCardModal> = ({
                                                            closeModal,
                                                            modalMode,
                                                            cardId,
                                                            packId,
                                                            initialQuestion,
                                                            initialAnswer
                                                        }) => {
    const dispatch = useTypedDispatch();
    const [answer, setAnswer] = useState<string>(initialAnswer);
    const [question, setQuestion] = useState<string>(initialQuestion);
    const editModalHandler = () => {
        closeModal()
        dispatch(updateCardTC(cardId, packId, question, answer))
    };
    return (
        <ModalEdited closeModal={closeModal} modalMode={modalMode}>
            <SuperInputText placeholder={'Question'} value={question} onChange={(e) => {
                setQuestion(e.currentTarget.value)
            }}/>
            <SuperInputText placeholder={'Answer'} value={answer} onChange={(e) => {
                setAnswer(e.currentTarget.value)
            }}/>
            <SuperButton title={'Cancel'} onClick={closeModal}/>
            <SuperButton title={'Update'} onClick={editModalHandler}/>
        </ModalEdited>
    );
};
