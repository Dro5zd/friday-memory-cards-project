import React, {useEffect} from 'react'
import s from './cardsList.module.css'
import SuperInputText from '../../common/c1-SuperInputText/SuperInputText';
import {CardItem} from "./c1-cards/CardItem";
import {useTypedDispatch, useTypedSelector} from "../../../m2-bll/store";
import {createNewCardTC, deleteCardTC, getCardsTC, updateCardTC} from "../../../m2-bll/cardsReducer";
import {useParams} from "react-router-dom";
import SuperButton from "../../common/c2-SuperButton/SuperButton";
import {Pagination} from "../../common/c11-Pagination/Pagination";
import {changeCardsCurrentPageAC} from "../../../m2-bll/appReducer";
import {setUpdateCardFilterAC, setUpdatedFilterAC} from "../../../m2-bll/sortReducer";
import {getCardPackTC} from "../../../m2-bll/cardPacksReducer";

export const CardsList = () => {
  const {urlCardsPackId} = useParams<string>();
  const dispatch = useTypedDispatch();
  const cards = useTypedSelector(state => state.cards);
  const userId = useTypedSelector<string>(state => state.auth._id);
  const packUserId = useTypedSelector<string>(state => state.cards.packUserId)
  const sortCards = useTypedSelector<string>(state => state.sort.sortCards)
  const isOwner = userId === packUserId

  useEffect(() => {
    if (urlCardsPackId) {
      dispatch(getCardsTC(urlCardsPackId))
    }
  }, [dispatch, urlCardsPackId]);

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

  const sortUpdatedCardsHandler = (value: string) => {
    sortCards === `0${value}`
      ? dispatch(setUpdateCardFilterAC(`1${value}`))
      : dispatch(setUpdateCardFilterAC(`0${value}`))
    urlCardsPackId && dispatch(getCardsTC(urlCardsPackId))
  }

  return (
    <div className={s.container}>
      <div className={s.components}>
        <div className={s.packSide}>
          <h4>PACKS LIST</h4>
          <div className={s.searchContainer}>
            <SuperInputText className={s.searchInput}/>
            <SuperButton title={'Question'} className={s.searchButton}/>
            <SuperInputText className={s.searchInput}/>
            <SuperButton title={'Answer'} className={s.searchButton}/>
          </div>
          {isOwner && <SuperButton onClick={addNewCard} title={'Add new card'}/>}
          <div className={s.packsContainer}>
            <div className={s.packListHeader}>
              <div className={s.nameTitle}>Question</div>
              <div className={s.nameTitle}>Answer</div>
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