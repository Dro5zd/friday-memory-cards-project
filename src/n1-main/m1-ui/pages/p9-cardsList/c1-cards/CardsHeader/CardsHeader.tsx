import React from 'react';
import s from './CardsHeader.module.css';
import {DebounceSearch} from "../../../../common/c13-DebounceSearch/DebounceSearch";
import SuperButton from "../../../../common/c2-SuperButton/SuperButton";
import arrowLeft from "../../../../../../assets/img/arrowLeft.svg";
import {setCardsAnswerValue, setCardsQuestionValue} from '../../../../../m2-bll/sortReducer';
import {PATH} from "../../../../routes/Routs";
import {useTypedDispatch} from "../../../../../m2-bll/store";
import {useNavigate} from 'react-router-dom';

type CardsHeaderType = {
    isOwner: boolean;
    addNewCard: () => void;
}

export const CardsHeader: React.FC<CardsHeaderType> = ({isOwner, addNewCard}) => {

    const dispatch = useTypedDispatch();
    const navigate = useNavigate();

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
            <div className={s.arrowWrapper} onClick={goBackHandler} >
                <img className={s.arrowLeft} src={arrowLeft}
                     alt="arrowLeft"/>
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