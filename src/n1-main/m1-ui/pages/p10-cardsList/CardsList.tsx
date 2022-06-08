import React, {useEffect} from 'react'
import s from './cardsList.module.css'
import {CardItem} from "./c1-cards/CardItem";
import {useTypedDispatch, useTypedSelector} from "../../../m2-bll/store";
import {createNewCardTC, deleteCardTC, getCardsTC, updateCardTC} from "../../../m2-bll/cardsReducer";
import {useNavigate, useParams} from "react-router-dom";
import SuperButton from "../../common/c2-SuperButton/SuperButton";
import {Pagination} from "../../common/c11-Pagination/Pagination";
import {changeCardsCurrentPageAC} from "../../../m2-bll/appReducer";
import {setCardsAnswerValue, setUpdateCardFilterAC} from "../../../m2-bll/sortReducer";
import {DebounceSearch} from "../../common/c13-DebounceSearch/DebounceSearch";
import {setCardsQuestionValue} from "../../../m2-bll/sortReducer";
import arrowLeftBlackWhite from '../../../../assets/img/arrowLeftBlackWhite.png'
import arrowLeftWhite from '../../../../assets/img/arrowLeft.png'
import {PATH} from "../../routes/Routs";

export const CardsList = () => {
  const {urlCardsPackId} = useParams<string>();
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();
  const cards = useTypedSelector(state => state.cards);
  const userId = useTypedSelector<string>(state => state.auth._id);
  const packUserId = useTypedSelector<string>(state => state.cards.packUserId)
  const sortCards = useTypedSelector<string>(state => state.sort.sortCards)
  const mode = useTypedSelector(state => state.ui.mode)
  const question = useTypedSelector(state => state.sort.cardsQuestionValue)
  const answer = useTypedSelector(state => state.sort.cardsAnswerValue)
  const isOwner = userId === packUserId


  useEffect(() => {
    if (urlCardsPackId) {
      dispatch(getCardsTC(urlCardsPackId))
    }
  }, [dispatch, urlCardsPackId, question, answer]);

  const deleteCard = (cardId: string, packId: string) => {
    dispatch(deleteCardTC(cardId, packId))
  };
  const addNewCard = () => {
    if (urlCardsPackId) {
      dispatch(createNewCardTC({cardsPack_id: urlCardsPackId}))
    }
  };
  const updateCard = (cardId: string, packId: string) => {
    dispatch(updateCardTC(cardId, packId))
  };
  const changeCurrentPage = (page: number) => {
    dispatch(changeCardsCurrentPageAC(page));
    urlCardsPackId && dispatch(getCardsTC(urlCardsPackId))
  };
  const debounceQuestionHandler = (text: string) => {
    dispatch(setCardsQuestionValue(text))
  };
  const debounceAnswerHandler = (text: string) => {
    dispatch(setCardsAnswerValue(text))
  };
  const sortUpdatedCardsHandler = (value: string) => {
    sortCards === `0${value}`
      ? dispatch(setUpdateCardFilterAC(`1${value}`))
      : dispatch(setUpdateCardFilterAC(`0${value}`))
    urlCardsPackId && dispatch(getCardsTC(urlCardsPackId))
  }
  const goBackHandler = () => {
    navigate(PATH.PACKS_LIST)
  }
  return (
    <div className={s.container}>
      <div className={s.components}>
        <div className={s.packSide}>
          <div className={s.arrowWrapper}>
            <img onClick={goBackHandler} className={s.arrowLeft} src={mode ? arrowLeftBlackWhite : arrowLeftWhite}
                 alt="arrowLeft"/>
          </div>
          <h2 className={s.cardListTitle}>CARDS LIST</h2>
          <div className={s.searchContainer}>
            <DebounceSearch className={s.searchInput} delay={1500} callback={debounceQuestionHandler}/>
            <DebounceSearch className={s.searchInput} delay={1500} callback={debounceAnswerHandler}/>
            {isOwner && <SuperButton className={s.searchButton} onClick={addNewCard} title={'Add new card'}/>}
          </div>
          <div className={s.packsContainer}>
            <div className={s.packListHeader}>
              <div className={s.questionColumn}>Question</div>
              <div className={s.answerTitle}>Answer</div>
              <div className={s.updateTitle}>Last Updated</div>
              <div onClick={() => sortUpdatedCardsHandler('grade')} className={s.gradeTitle}>Grade</div>
              <div className={s.actionsTitle}>Actions</div>
            </div>
            {cards.cards.map((card) => {
              return <CardItem isOwner={isOwner} key={card._id} card={card} deleteCard={deleteCard}
                               updateCard={updateCard}/>
            })}
          </div>
          <div className={s.paginationContainer}>
            <Pagination totalItemsCount={cards.cardsTotalCount} pageSize={cards.pageCount}
                        currentPage={cards.page} onPageChanged={changeCurrentPage}/>
          </div>
        </div>
      </div>
    </div>
  )
}