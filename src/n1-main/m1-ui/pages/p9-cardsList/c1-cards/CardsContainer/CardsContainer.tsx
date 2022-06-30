import React, {useState} from 'react';
import s from './cardsContainer.module.css';
import {CardItem} from '../CardItem/CardItem';
import {setUpdateCardFilterAC} from '../../../../../m2-bll/sortReducer';
import {getCardsTC} from '../../../../../m2-bll/cardsReducer';
import {useTypedDispatch, useTypedSelector} from '../../../../../m2-bll/store';
import {useParams} from 'react-router-dom';
import sortUp from '../../../../../../assets/img/sortUp.svg'
import sortDown from '../../../../../../assets/img/sortDown.svg'
import {DeleteCardModal} from '../CardsModals/DeleteCardModal/DeleteCardModal';
import {EditCardModal} from '../CardsModals/EditCardModal/EditCardModal';
import {LearnCardModal} from '../CardsModals/OpenCardModal/LearnCardModal';


export const CardsContainer = () => {
  const {urlCardsPackId} = useParams<string>();
  const cards = useTypedSelector(state => state.cards);
  const sortCards = useTypedSelector<string>(state => state.sort.sortCards);
  const userId = useTypedSelector<string>(state => state.auth._id);
  const packUserId = useTypedSelector<string>(state => state.cards.packUserId);
  const dispatch = useTypedDispatch();
  const isOwner = userId === packUserId;


  const [openEditModalId, setOpenEditModalId] = useState<string[]>([])
  const [openDeleteModalId, setOpenDeleteModalId] = useState<string[]>([])
  const [openLearnModalId, setOpenLearnModalId] = useState<string[]>([])

  const sortUpdatedCardsHandler = (value: string) => {
    sortCards === `0${value}`
      ? dispatch(setUpdateCardFilterAC(`1${value}`))
      : dispatch(setUpdateCardFilterAC(`0${value}`))
    urlCardsPackId && dispatch(getCardsTC(urlCardsPackId))
  }

  const fullDelete = openDeleteModalId.length === 2
  const fullEdit = openEditModalId.length === 4
  const fullLearn = openLearnModalId.length === 6


  const closeDeleteModalHandler = () => {
    setOpenDeleteModalId([])
  }
  const openDeleteModalHandler = (packId: string, cardId: string) => {
    setOpenDeleteModalId([packId, cardId])
  }

  const closeEditModalHandler = () => {
    setOpenEditModalId([])
  }
  const openEditModalHandler = (packId: string, cardId: string, question: string, answer: string) => {
    setOpenEditModalId([packId, cardId, question, answer])
  }


  const closeLearnModalHandler = () => {
    setOpenLearnModalId([])
  }
  const openLearnModalHandler = (
    question: string,
    answer: string,
    questionImg: string,
    answerImg: string,
    questionVideo: string,
    answerVideo: string
  ) => {
    setOpenLearnModalId([question, answer, questionImg, answerImg, questionVideo, answerVideo])
  }

  return (
    <div className={s.packsContainer}>
      <div>
            <DeleteCardModal
              closeModal={closeDeleteModalHandler}
              modalMode={fullDelete}
              packId={openDeleteModalId[0]}
              cardId={openDeleteModalId[1]}
            />
            <EditCardModal
              initialQuestion={openEditModalId[2]}
              initialAnswer={openEditModalId[3]}
              cardId={openEditModalId[1]}
              packId={openEditModalId[0]}
              closeModal={closeEditModalHandler}
              modalMode={fullEdit}/>

            <LearnCardModal
              closeModal={closeLearnModalHandler}
              modalMode={fullLearn}
              question={openLearnModalId[0]}
              answer={openLearnModalId[1]}
              questionImg={openLearnModalId[2]}
              answerImg={openLearnModalId[3]}
              questionVideo={openLearnModalId[4]}
              answerVideo={openLearnModalId[5]}
            />
            <table>
              <thead>
              <tr className={s.packListHeader}>
                <th className={s.questionTitle}
                    onClick={() => sortUpdatedCardsHandler('question')}>Question <div
                  className={s.sortUp}>{sortCards === `0question`
                  ? <img src={sortUp} alt="sortUpWhite"/>
                  : <img src={sortDown} alt="sortDownBlack"/>}
                </div></th>
                <th className={s.answerTitle}
                    onClick={() => sortUpdatedCardsHandler('answer')}>Answer <div
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
                return <CardItem
                  openEditModalHandler={openEditModalHandler}
                  openDeleteModalHandler={openDeleteModalHandler}
                  openLearnModalHandler={openLearnModalHandler}
                  isOwner={isOwner}
                  key={card._id}
                  card={card}
                />
              })}
              </tbody>
            </table>
          </div>
    </div>
  );
};
