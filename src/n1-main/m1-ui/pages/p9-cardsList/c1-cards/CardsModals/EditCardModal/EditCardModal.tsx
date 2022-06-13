import React, {useState} from 'react';
import SuperInputText from "../../../../../common/c1-SuperInputText/SuperInputText";
import {ModalEdited} from "../../../../../common/c15-Modal/ModalEdited";
import SuperButton from "../../../../../common/c2-SuperButton/SuperButton";
import {useTypedDispatch} from "../../../../../../m2-bll/store";
import {updateCardTC} from "../../../../../../m2-bll/cardsReducer";
import s from "../../../../p8-packsList/p1-packs/PackModals/Modal.module.css";

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
            <div className={s.wrapper}>
              <span className={s.title}>Update Card</span>
              <SuperInputText
                className={s.packNameInput}
                placeholder={'Question'}
                value={question}
                onChange={(e) => {setQuestion(e.currentTarget.value)}}
              />
              <SuperInputText
                className={s.packNameInput}
                placeholder={'Answer'}
                value={answer}
                onChange={(e) => {setAnswer(e.currentTarget.value)}}
              />
              <div className={s.btnWrapper}>
                <SuperButton className={s.saveButton} title={'Update'} onClick={editModalHandler}/>
                <SuperButton className={s.cancelButton} title={'Cancel'} onClick={closeModal}/>
              </div>
            </div>
        </ModalEdited>
    );
};
