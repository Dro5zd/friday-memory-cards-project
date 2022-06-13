import React, {useEffect, useState} from 'react'
import s from './learningPage.module.css';
import SuperButton from '../../common/c2-SuperButton/SuperButton';
import {NavLink, useParams} from 'react-router-dom';
import {PATH} from '../../routes/Routs';
import {useTypedDispatch, useTypedSelector} from '../../../m2-bll/store';
import Preloader from '../../common/c7-Preloader/Preloader';
import {CardType, getCardsTC} from '../../../m2-bll/cardsReducer';
import {setCardGradeTC} from '../../../m2-bll/gradeReducer';

const grades = ['не знал', 'забыл', 'долго думал', 'перепутал', 'знал'];

export const LearningPage = () => {

    const status = useTypedSelector(state => state.app.status)
    const packs = useTypedSelector(state => state.packs.cardPacks)
    const {cards} = useTypedSelector(state => state.cards);
    const dispatch = useTypedDispatch()


    const getCard = (cards: CardType[]) => {
        const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
        const rand = Math.random() * sum;
        const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
                const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
                return {sum: newSum, id: newSum < rand ? i : acc.id}
            }
            , {sum: 0, id: -1});
        console.log('test: ', sum, rand, res)

        return cards[res.id + 1];
    }


    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [first, setFirst] = useState<boolean>(true);
    // const [first, setFirst] = useState<boolean>(0);
    const {urlCardsPackId} = useParams();


    const [card, setCard] = useState<CardType>({
        _id: 'fake',
        cardsPack_id: '',

        answer: 'answer fake',
        question: 'question fake',
        grade: 0,
        shots: 0,

        user_id: '',
        created: '',
        updated: '',
    });

    useEffect(() => {
        console.log('LearnContainer useEffect');

        if (first) {
            urlCardsPackId && dispatch(getCardsTC(urlCardsPackId));
            setFirst(false);
        }

        console.log('cards', cards)
        if (cards.length > 0) setCard(getCard(cards));

        return () => {
            console.log('LearnContainer useEffect off');
        }
    }, [dispatch, urlCardsPackId, cards, first]);


    const packName = packs.find((p) => {
        return p._id === urlCardsPackId
    }) || packs[0]


    const onNext = () => {
        setIsChecked(false);

        if (cards.length > 0) {
            // dispatch
            setCard(getCard(cards));
        } else {

        }
    }


    const addRating = (value: number) => {
        dispatch(setCardGradeTC( {grade: value, card_id: card._id}))
        dispatch(getCardsTC(card.cardsPack_id))
        onNext()
    }


    return (
        <div className={s.learningContainer}>
            <div className={s.components}>
                {status === 'loading'
                    ? <Preloader/>
                    : <>
                        <NavLink to={PATH.PACKS_LIST} className={navData => navData.isActive ? s.active : s.link}>
                            <div className={s.close}></div>
                        </NavLink>
                        Learning pack
                        <h2 className={s.profileName}>{packName.name}</h2>

                        <span className={s.question}>{card.question}</span>

                        {!isChecked && <SuperButton className={s.editButton} title={'Show Answer'} onClick={() => setIsChecked(true)}/>}


                        {isChecked && (
                            <>

                                <span className={s.question}>{card.answer}</span>

                                {grades.map((g, i) => (
                                    <SuperButton key={'grade-' + i} onClick={()=>addRating(i+1)} title={g}/>
                                ))}
                            </>
                        )}

                    </>

                }
            </div>
        </div>
    )
}




