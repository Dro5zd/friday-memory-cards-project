import React from 'react';
import s from './cardsContainer.module.css';
import {CardItem} from '../CardItem/CardItem';
import {setUpdateCardFilterAC} from '../../../../../m2-bll/sortReducer';
import {getCardsTC} from '../../../../../m2-bll/cardsReducer';
import {useTypedDispatch, useTypedSelector} from '../../../../../m2-bll/store';
import {useParams} from 'react-router-dom';
import sortUp from '../../../../../../assets/img/sortUp.svg'
import sortDown from '../../../../../../assets/img/sortDown.svg'
import Preloader from "../../../../common/c7-Preloader/Preloader";

interface ICardsContainer {

}

export const CardsContainer: React.FC<ICardsContainer> = () => {
    const {urlCardsPackId} = useParams<string>();
    const cards = useTypedSelector(state => state.cards);
    const sortCards = useTypedSelector<string>(state => state.sort.sortCards);
    const userId = useTypedSelector<string>(state => state.auth._id);
    const packUserId = useTypedSelector<string>(state => state.cards.packUserId);
    const status = useTypedSelector(state => state.app.status);
    const dispatch = useTypedDispatch();
    const isOwner = userId === packUserId;

    const sortUpdatedCardsHandler = (value: string) => {
        sortCards === `0${value}`
            ? dispatch(setUpdateCardFilterAC(`1${value}`))
            : dispatch(setUpdateCardFilterAC(`0${value}`))
        urlCardsPackId && dispatch(getCardsTC(urlCardsPackId))
    }

    return (
        <div className={s.packsContainer}>
            {
                status === 'loading'
                    ? <Preloader/>
                    : <table>
                        <thead>
                        <tr className={s.packListHeader}>
                            <th className={s.questionTitle}
                                onClick={() => sortUpdatedCardsHandler('question')}>Question <div
                                className={s.sortUp}>{sortCards === `0question`
                                ? <img src={sortUp} alt="sortUpWhite"/>
                                : <img src={sortDown} alt="sortDownBlack"/>}
                            </div></th>
                            <th className={s.answerTitle} onClick={() => sortUpdatedCardsHandler('answer')}>Answer <div
                                className={s.sortUp}>{sortCards === `0answer`
                                ? <img src={sortUp} alt="sortUpWhite"/>
                                : <img src={sortDown} alt="sortDownBlack"/>}
                            </div></th>
                            <th onClick={() => sortUpdatedCardsHandler('updated')} className={s.updateTitle}>Last
                                Updated <div
                                    className={s.sortUp}>{sortCards === `0updated`
                                    ? <img src={sortUp} alt="sortUpWhite"/>
                                    : <img src={sortDown} alt="sortDownBlack"/>}
                                </div></th>
                            <th onClick={() => sortUpdatedCardsHandler('grade')} className={s.gradeTitle}>Grade <div
                                className={s.sortUp}>{sortCards === `0grade`
                                ? <img src={sortUp} alt="sortUpWhite"/>
                                : <img src={sortDown} alt="sortDownBlack"/>}
                            </div></th>
                            <th className={s.actionsTitle}>Actions</th>
                        </tr>
                        </thead>
                        <tbody className={s.cardListBody}>
                        {cards.cards.map((card) => {
                            return <CardItem isOwner={isOwner} key={card._id} card={card}/>
                        })}
                        </tbody>
                    </table>
            }
        </div>
    );
};
