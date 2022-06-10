import React, {useEffect} from 'react';
import s from './CardsHeader.module.css';
import {DebounceSearch} from "../../../../common/c13-DebounceSearch/DebounceSearch";
import SuperButton from "../../../../common/c2-SuperButton/SuperButton";
import arrowLeftBlackWhite from "../../../../../../assets/img/arrowLeftBlackWhite.png";
import arrowLeftWhite from "../../../../../../assets/img/arrowLeft.png";
import {setCardsAnswerValue, setCardsQuestionValue} from "../../../../../m2-bll/sortReducer";
import {PATH} from "../../../../routes/Routs";
import {createNewCardTC, getCardsTC} from "../../../../../m2-bll/cardsReducer";
import {useTypedDispatch, useTypedSelector} from "../../../../../m2-bll/store";
import {useNavigate, useParams} from "react-router-dom";

export const CardsHeader = () => {
  const {urlCardsPackId} = useParams<string>();
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();
  const packUserId = useTypedSelector<string>(state => state.cards.packUserId)
  const userId = useTypedSelector<string>(state => state.auth._id);
  const mode = useTypedSelector(state => state.ui.mode)
  const question = useTypedSelector(state => state.sort.cardsQuestionValue)
  const answer = useTypedSelector(state => state.sort.cardsAnswerValue)
  const isOwner = userId === packUserId

  useEffect(() => {
    if (urlCardsPackId) {
      dispatch(getCardsTC(urlCardsPackId))
    }
  }, [dispatch, urlCardsPackId, question, answer]);

  const addNewCard = () => {
    if (urlCardsPackId) {
      dispatch(createNewCardTC({cardsPack_id: urlCardsPackId}))
    }
  };

  const debounceQuestionHandler = (text: string) => {
    dispatch(setCardsQuestionValue(text))
  };
  const debounceAnswerHandler = (text: string) => {
    dispatch(setCardsAnswerValue(text))
  };

  const goBackHandler = () => {
    navigate(PATH.PACKS_LIST)
  }

  return (
    <div>
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