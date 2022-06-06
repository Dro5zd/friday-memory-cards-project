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

export const CardsList = () => {
    const {urlCardsPackId} = useParams<string>();
    const dispatch = useTypedDispatch();
    const cards = useTypedSelector(state => state.cards);
    const userId = useTypedSelector<string>(state => state.auth._id);
    const packUserId = useTypedSelector<string>(state => state.cards.packUserId)
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
                            <div className={s.gradeTitle}>Grade</div>
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


// return (
//   <div className={s.container}>
//     <div className={s.components}>
//       <div className={s.packListTitle}>
//         <SuperButton onClick={addNewCard} title={'Add new card'}/>
//         CARDSLIST
//         <SuperInputText/>
//         <SuperInputText/>
//         <div className={s.cardsListHeader}>
//           <div className={s.titles}>Question</div>
//           <div className={s.titles}>Answer</div>
//           <div className={s.titles}>Last Updated</div>
//           <div className={s.titles}>Grade</div>
//           <div className={s.titles}>Actions</div>
//         </div>
//         {cards.cards.map((card) => {
//           return <CardItem key={card._id} card={card} deleteCard={deleteCard} updateCard={updateCard}/>
//         })}
//       </div>
//     </div>
//   </div>
// )
// };




