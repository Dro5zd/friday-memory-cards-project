import React, {useEffect} from 'react'
import s from './cardsList.module.css'
import SuperInputText from '../../common/c1-SuperInputText/SuperInputText';
import {CardItem} from "./c1-cards/CardItem";
import {useTypedDispatch, useTypedSelector} from "../../../m2-bll/store";
import {createNewCardTC, deleteCardTC, getCardsTC, updateCardTC} from "../../../m2-bll/cardsReducer";
import {useParams} from "react-router-dom";
import SuperButton from "../../common/c2-SuperButton/SuperButton";

export const CardsList = () => {
    const {urlCardsPackId} = useParams<string>();
    const testId = '627e522711ad202f585a05f5';
    const dispatch = useTypedDispatch();
    const cards = useTypedSelector(state => state.cards);

    useEffect(() => {
        if (urlCardsPackId) {
            dispatch(getCardsTC({cardsPack_id: urlCardsPackId}))
        }
    }, [dispatch, urlCardsPackId]);

    const deleteCard = (cardId: string) => {
        dispatch(deleteCardTC(cardId))
    };
    const addNewCard = () => {
        if (urlCardsPackId) {
            dispatch(createNewCardTC({cardsPack_id: urlCardsPackId}))
        }
    }
    const updateCard = (cardId: string) => {
        dispatch(updateCardTC(cardId))
    }

    return (
        <div className={s.container}>
            <div className={s.components}>
                <div className={s.packListTitle}>
                    <SuperButton onClick={addNewCard} title={'Add new card'}/>
                    CARDSLIST
                    <SuperInputText/>
                    <SuperInputText/>
                    <div className={s.cardsListHeader}>
                        <div className={s.titles}>Question</div>
                        <div className={s.titles}>Answer</div>
                        <div className={s.titles}>Last Updated</div>
                        <div className={s.titles}>Grade</div>
                        <div className={s.titles}>Actions</div>
                    </div>
                    {cards.cards.map((card) => {
                        return <CardItem key={card._id} card={card} deleteCard={deleteCard} updateCard={updateCard}/>
                    })}
                </div>
            </div>
        </div>
    )
};


