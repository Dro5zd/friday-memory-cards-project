import React, {useState} from 'react';
import s from './CardsHeader.module.css';
import {DebounceSearch} from "../../../../common/c13-DebounceSearch/DebounceSearch";
import SuperButton from "../../../../common/c2-SuperButton/SuperButton";
import arrowLeft from "../../../../../../assets/img/arrowLeft.svg";
import {setCardsAnswerValue, setCardsQuestionValue, setRangeValueAC} from '../../../../../m2-bll/sortReducer';
import {PATH} from "../../../../routes/Routs";
import {useTypedDispatch} from "../../../../../m2-bll/store";
import {useNavigate} from 'react-router-dom';
import {useModalHandler} from '../../../../../utils/use-modal-handler';

type CardsHeaderType = {
    isOwner: boolean;
    addNewCard: () => void;
}

export const CardsHeader: React.FC<CardsHeaderType> = ({isOwner, addNewCard}) => {

    const [text, setText] = useState('')

    const dispatch = useTypedDispatch();
    const navigate = useNavigate();

    const {modal: flag, toggleModal: toggleFlag} = useModalHandler()

    const debounceHandler = (text: string) => {
        flag ? dispatch(setCardsAnswerValue(text)) :
        dispatch(setCardsQuestionValue(text))
    };

    const goBackHandler = () => {
        dispatch(setRangeValueAC(0, 1500))
        dispatch(setCardsQuestionValue(''))
        dispatch(setCardsAnswerValue(''))
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
                <div className={s.searchContainer2}>
                    <DebounceSearch className={s.searchInput} delay={1500} placeHolder={'Search by '} callback={debounceHandler} setText={setText}/>
                    {!text && <SuperButton onClick={toggleFlag} className={s.searchButton2} title={flag ? 'answer' : 'question'}> </SuperButton>}
                </div>

                {isOwner && <SuperButton className={s.searchButton} onClick={addNewCard} title={'Add new card'}/>}
            </div>
        </div>
    );
};