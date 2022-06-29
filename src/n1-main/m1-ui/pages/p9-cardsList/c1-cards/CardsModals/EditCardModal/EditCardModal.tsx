import React, {useEffect, useState} from 'react';
import SuperInputText from "../../../../../common/c1-SuperInputText/SuperInputText";
import {ModalEdited} from "../../../../../common/c14-Modal/ModalEdited";
import SuperButton from "../../../../../common/c2-SuperButton/SuperButton";
import {useTypedDispatch} from "../../../../../../m2-bll/store";
import {updateCardTC} from "../../../../../../m2-bll/cardsReducer";
import s from "../../../../p8-packsList/p1-packs/PackModals/Modal.module.css";
import {AttachFiles} from "../AttachFiles";
import fileAdded from "../../../../../../../assets/img/check-solid.svg";
import {UpdateCardDataType} from "../../../../../../m3-dal/cards-api";

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

  useEffect(() => {
      setAnswer(initialAnswer)
      setQuestion(initialQuestion)
    },
    [initialQuestion, initialAnswer])

  const [answerPhoto, setAnswerPhoto] = useState<string>('');
  const [questionPhoto, setQuestionPhoto] = useState<string>('');
  const [questionVideo, setQuestionVideo] = useState<string>('');
  const [answerVideo, setAnswerVideo] = useState<string>('');
  const [answer, setAnswer] = useState<string>(initialAnswer);
  const [question, setQuestion] = useState<string>(initialQuestion);

  const userCards: UpdateCardDataType = {
    _id: cardId,
    questionImg: questionPhoto,
    answerImg: answerPhoto,
    question,
    answer,
    questionVideo,
    answerVideo
  }

  const editModalHandler = () => {
    closeModal()
    dispatch(updateCardTC(userCards, packId))
  };
  return (
    <ModalEdited closeModal={closeModal} modalMode={modalMode}>
      <div className={s.wrapper}>
        <span className={s.title}>Update Card</span>

        {userCards.questionImg && <img className={s.questionIcon} src={fileAdded} alt="photoIcon"/>}
        {userCards.questionVideo && <img className={s.questionIcon} src={fileAdded} alt="videoIcon"/>}

        <AttachFiles
          addPhoto={setQuestionPhoto}
          addVideo={setQuestionVideo}
        />

        <div className={s.iconsPositionWrapper}>
          {userCards.answerImg && <img className={s.answerIcon} src={fileAdded} alt="photoIcon"/>}
          {userCards.answerVideo && <img className={s.answerIcon} src={fileAdded} alt="videoIcon"/>}

          <SuperInputText
            className={s.packNameInput}
            placeholder={'Question'}
            value={question}
            onChange={(e) => {
              setQuestion(e.currentTarget.value)
            }}
          />
        </div>

        <AttachFiles
          addPhoto={setAnswerPhoto}
          addVideo={setAnswerVideo}
        />

        <SuperInputText
          className={s.packNameInput}
          placeholder={'Answer'}
          value={answer}
          onChange={(e) => {
            setAnswer(e.currentTarget.value)
          }}
        />
        <div className={s.btnWrapper}>
          <SuperButton className={s.saveButton} title={'Update'} onClick={editModalHandler}/>
          <SuperButton className={s.cancelButton} title={'Cancel'} onClick={closeModal}/>
        </div>
      </div>
    </ModalEdited>
  );
};
