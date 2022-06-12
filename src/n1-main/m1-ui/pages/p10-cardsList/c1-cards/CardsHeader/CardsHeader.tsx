import React, {ChangeEvent, useState} from 'react';
import s from './CardsHeader.module.css';
import {DebounceSearch} from "../../../../common/c13-DebounceSearch/DebounceSearch";
import SuperButton from "../../../../common/c2-SuperButton/SuperButton";
import arrowLeftBlackWhite from "../../../../../../assets/img/arrowLeftBlackWhite.png";
import arrowLeftWhite from "../../../../../../assets/img/arrowLeft.png";
import {setCardsAnswerValue, setCardsQuestionValue} from '../../../../../m2-bll/sortReducer';
import {PATH} from "../../../../routes/Routs";
import {useTypedDispatch, useTypedSelector} from "../../../../../m2-bll/store";
import {useNavigate, useParams} from 'react-router-dom';
import SuperInputText from '../../../../common/c1-SuperInputText/SuperInputText';
import {Modal} from '../../../../common/c15-Modal/Modal';
import {CreatePackDataType} from '../../../../../m3-dal/cardPacks-api';
import {changeModalModeAC} from '../../../../../m2-bll/uiReducer';
import {changePacksCurrentPageAC} from '../../../../../m2-bll/appReducer';
import {createNewCardTC} from '../../../../../m2-bll/cardsReducer';

type CardsHeaderType = {
  isOwner: boolean
}

export const CardsHeader: React.FC<CardsHeaderType> = ({isOwner}) => {

  const dispatch = useTypedDispatch();
  const navigate = useNavigate();
  const mode = useTypedSelector(state => state.ui.mode)
    const modelMode = useTypedSelector(state => state.ui.modalMode)
    const {urlCardsPackId} = useParams<string>();

  const debounceQuestionHandler = (text: string) => {
    dispatch(setCardsQuestionValue(text))
  };
  const debounceAnswerHandler = (text: string) => {
    dispatch(setCardsAnswerValue(text))
  };

  const goBackHandler = () => {
    navigate(PATH.PACKS_LIST)
  }

    const createCardButtonHandler = (data: CreatePackDataType) => {
        dispatch(changeModalModeAC(!modelMode))
        dispatch(changePacksCurrentPageAC(1))
        dispatch(createNewCardTC({cardsPack_id: urlCardsPackId}))
    }

    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')

  const addQuestionHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setQuestion(e.currentTarget.value)
    }

    const addAnswerHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setAnswer(e.currentTarget.value)
    }

    const addNewCard = () => {
        if (urlCardsPackId) {
            dispatch(createNewCardTC({cardsPack_id: urlCardsPackId}))
        }
    };


  return (
    <div>
        <Modal>
            <SuperInputText placeholder='Question' onChange={addQuestionHandler} autoFocus/>
            <SuperInputText placeholder='Answer' onChange={addAnswerHandler}/>
            <SuperButton
                onClick={() => {createCardButtonHandler({cardsPack: {name: packName}})}}
                title={'CREATE PACK'}
                className={s.searchButton}
                // disabled={packName === ''}
            />
        </Modal>
      <div className={s.arrowWrapper}>
        <img onClick={goBackHandler} className={s.arrowLeft} src={mode ? arrowLeftBlackWhite : arrowLeftWhite} alt="arrowLeft"/>
      </div>
      <h2 className={s.cardListTitle}>CARDS LIST</h2>
      <div className={s.searchContainer}>
        <DebounceSearch className={s.searchInput} delay={1500} callback={debounceQuestionHandler}/>
        <DebounceSearch className={s.searchInput} delay={1500} callback={debounceAnswerHandler}/>
        {isOwner && <SuperButton className={s.searchButton} onClick={addNewCard} title={'Add new card'}/>}
      </div>
    </div>
  );
};