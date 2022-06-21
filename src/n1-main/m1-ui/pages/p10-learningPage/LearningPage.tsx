import React, {useEffect, useState} from 'react'
import s from './learningPage.module.css';
import SuperButton from '../../common/c2-SuperButton/SuperButton';
import {NavLink, useParams} from 'react-router-dom';
import {PATH} from '../../routes/Routs';
import {useTypedDispatch, useTypedSelector} from '../../../m2-bll/store';
import {CardType, getCardsTC} from '../../../m2-bll/cardsReducer';
import {setCardGradeTC} from '../../../m2-bll/gradeReducer';
import meh from '../../../../assets/img/face-meh-blank-solid.svg'
import smile from '../../../../assets/img/face-smile-solid.svg'
import grin from '../../../../assets/img/face-grin-solid.svg'
import surprise from '../../../../assets/img/face-surprise-solid.svg'
import frown from '../../../../assets/img/face-frown-solid.svg'

const grades = [frown, meh, surprise, smile, grin];

export const LearningPage = () => {

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
    return cards[res.id + 1];
  }

  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [first, setFirst] = useState<boolean>(true);
  const {urlCardsPackId} = useParams();


  const [card, setCard] = useState<CardType>({
    _id: 'fake',
    cardsPack_id: '',

    answer: '',
    question: '',
    grade: 0,
    shots: 0,

    user_id: '',
    created: '',
    updated: '',
    answerImg: '',
    questionImg: '',
    questionVideo: '',
    answerVideo: '',
  });

  useEffect(() => {
    if (first) {
      urlCardsPackId && dispatch(getCardsTC(urlCardsPackId));
      setFirst(false);
    }

    if (cards.length > 0) setCard(getCard(cards));

    return () => {
    }
  }, [dispatch, urlCardsPackId, cards, first]);


  const packName = packs.find((p) => {
    return p._id === urlCardsPackId
  }) || packs[0]


  const onNext = () => {
    setIsChecked(false);
    if (cards.length > 0) {
      setCard(getCard(cards));
    } else {

    }
  }

  const addRating = (value: number) => {
    dispatch(setCardGradeTC({grade: value, card_id: card._id}))
    onNext()
  }

  return (
    <div className={s.learningContainer}>
      <div className={s.components}>
        <NavLink to={PATH.PACKS_LIST} className={navData => navData.isActive ? s.active : s.link}>
          <div className={s.close}></div>
        </NavLink>
        <span className={s.packNameTitle}>Learning pack</span>
        <span className={s.packNameSubtitle}>"{packName.name}"</span>
        <span className={s.questionTitle}> Question: </span>
        <div className={s.questionWrapper}>
          <span className={s.question}>"{card.question}"</span>
        </div>
        {
          !isChecked &&
            <SuperButton className={s.editButton} title={'Show Answer'} onClick={() => setIsChecked(true)}/>
        }
        {
          isChecked && (
            <>
              <span className={s.answerTitle}>Answer: </span>
              <div className={s.answerWrapper}>
                <span className={s.answer}>"{card.answer}"</span>
              </div>
              <div className={s.btnWrapper}>
                {
                  grades.map((g, i) => (
                    <div className={s.answerBtn} key={'grade-' + i}
                         onClick={() => addRating(i + 1)}>
                      <img className={s.icon} src={g} id={g} alt="answerBtn"/>
                      <div className={s.headerTitleWrapper}>
                        {i === 0 && <span className={s.spanStyle}>Didn't know</span>}
                        {i === 1 && <span className={s.spanStyle}>Forgot</span>}
                        {i === 2 && <span className={s.spanStyle}>A lot of thought</span>}
                        {i === 3 && <span className={s.spanStyle}>Confused</span>}
                        {i === 4 && <span className={s.spanStyle}>Knew the answer</span>}
                      </div>
                    </div>
                  ))}
              </div>
            </>
          )}
      </div>
    </div>
  )
}