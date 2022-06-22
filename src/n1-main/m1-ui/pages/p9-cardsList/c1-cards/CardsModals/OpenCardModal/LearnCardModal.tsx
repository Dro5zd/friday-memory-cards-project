import React from 'react';
import {ModalEdited} from '../../../../../common/c14-Modal/ModalEdited';
import SuperButton from '../../../../../common/c2-SuperButton/SuperButton';
import s from './LernCardModal.module.css'

interface IOpenCardModal {
  closeModal: () => void;
  modalMode: boolean;
  question: string;
  answer: string;
  questionImg: string
  answerImg: string
  questionVideo: string
  answerVideo: string
}

export const LearnCardModal: React.FC<IOpenCardModal> = ({
                                                           closeModal,
                                                           modalMode,
                                                           question,
                                                           answer,
                                                           questionImg,
                                                           answerImg,
                                                           questionVideo,
                                                           answerVideo,
                                                         }) => {
  return (
    <ModalEdited closeModal={closeModal} modalMode={modalMode}>
      <div className={s.container}>
        <div className={s.title}>Question:</div>
        <div className={s.block}>
          {questionImg && <img className={s.qImg} src={questionImg} alt=""/>}
          {questionVideo && <video src={questionVideo} style={{width: '300px'}} controls/>}
          {/*<iframe width="300" height="200" src="https://www.youtube.com/embed/gb7gMluAeao" title="YouTube video player"*/}
          {/*        frameBorder="0"*/}
          {/*        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"*/}
          {/*        allowFullScreen></iframe>*/}
          <div className={s.titleQuestion}>"{question}"</div>
        </div>
        <div className={s.title}>Answer:</div>
        <div className={s.block}>
          {answerImg && <img className={s.aImg} src={answerImg} alt=""/>}
          {answerVideo && <video src={answerVideo} style={{width: '300px'}} controls/>}
          <div className={s.titleAnswer}>"{answer}"</div>
        </div>
        <SuperButton className={s.cancelButton} onClick={closeModal} title={'Close'}/>
      </div>
    </ModalEdited>
  );
};

