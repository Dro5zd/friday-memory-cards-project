import React, {useEffect, useState} from 'react'
import s from './cardsList.module.css'
import {useTypedDispatch, useTypedSelector} from "../../../m2-bll/store";
import {createNewCardTC, getCardsTC} from '../../../m2-bll/cardsReducer';
import {useParams} from "react-router-dom";
import {changeCardsCurrentPageAC} from "../../../m2-bll/appReducer";
import {CardsContainer} from './c1-cards/CardsContainer/CardsContainer';
import ServerErrors from "../../common/c0-ErrorsBlock/ServerErrors";
import {PaginationNew} from "../../common/c11-Pagination/PaginationNew";
import {CardsHeader} from "./c1-cards/CardsHeader/CardsHeader";
import Preloader from "../../common/c7-Preloader/Preloader";
import {Modal} from '../../common/c15-Modal/Modal';
import {AddCardModal} from "./c1-cards/CardsModals/AddCardModal/AddCardModal";
import {DeleteCardModal} from "./c1-cards/CardsModals/DeleteCardModal/DeleteCardModal";
import {EditCardModal} from "./c1-cards/CardsModals/EditCardModal/EditCardModal";

export const CardsList = () => {
    const {urlCardsPackId} = useParams<string>();
    const dispatch = useTypedDispatch();
    const cards = useTypedSelector(state => state.cards);
    const userId = useTypedSelector<string>(state => state.auth._id);
    const packUserId = useTypedSelector<string>(state => state.cards.packUserId);
    const question = useTypedSelector(state => state.sort.cardsQuestionValue);
    const answer = useTypedSelector(state => state.sort.cardsAnswerValue);
    const serverErrors = useTypedSelector(state => state.app.errors);
    const status = useTypedSelector(state => state.app.status);
    const isOwner = userId === packUserId;
    const [isInEdition, setIsInEdition] = useState(false);
    const [isInDeletion, setIsInDeletion] = useState(false);
    const [isInCreation, setIsInCreation] = useState(false);

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
    const deleteCard = (cardId: string, packId: string) => {
        setIsInDeletion(true)
    }
    const changeCurrentPage = (page: number) => {
        dispatch(changeCardsCurrentPageAC(page));
        urlCardsPackId && dispatch(getCardsTC(urlCardsPackId))
    };

    return (
        <div className={s.container}>
            <div className={s.components}>
                {
                    status === 'loading'
                        ? <Preloader/>
                        : <>
                            <div className={s.packSide}>

                                <AddCardModal closeModal={() => {
                                    setIsInCreation(false)
                                }} modalMode={isInCreation}/>


                                <CardsHeader addNewCard={() => {
                                    setIsInCreation(true)
                                }} isOwner={isOwner}/>
                                {serverErrors && <ServerErrors errors={serverErrors}/>}
                                <CardsContainer/>
                            </div>
                            <PaginationNew
                                totalCount={cards.cardsTotalCount}
                                pageSize={cards.pageCount}
                                currentPage={cards.page}
                                onPageChange={changeCurrentPage}
                                siblingCount={3}
                            />
                        </>
                }
            </div>

        </div>
    )
}