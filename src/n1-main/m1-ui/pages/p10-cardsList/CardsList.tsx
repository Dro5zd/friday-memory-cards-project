import React from 'react'
import s from './cardsList.module.css'
import {useTypedDispatch, useTypedSelector} from "../../../m2-bll/store";
import {getCardsTC} from "../../../m2-bll/cardsReducer";
import {useParams} from "react-router-dom";
import {changeCardsCurrentPageAC} from "../../../m2-bll/appReducer";
import {CardsContainer} from './c1-cards/CardsContainer/CardsContainer';
import {PaginationNew} from "../../common/c11-Pagination/PaginationNew";
import {CardsHeader} from "./c1-cards/CardsHeader/CardsHeader";

export const CardsList = () => {
  const {urlCardsPackId} = useParams<string>();
  const dispatch = useTypedDispatch();
  // const navigate = useNavigate();
  const cards = useTypedSelector(state => state.cards);
  // const userId = useTypedSelector<string>(state => state.auth._id);
  // const packUserId = useTypedSelector<string>(state => state.cards.packUserId)
  // const mode = useTypedSelector(state => state.ui.mode)
  // const question = useTypedSelector(state => state.sort.cardsQuestionValue)
  // const answer = useTypedSelector(state => state.sort.cardsAnswerValue)
  // const isOwner = userId === packUserId


  // useEffect(() => {
  //   if (urlCardsPackId) {
  //     dispatch(getCardsTC(urlCardsPackId))
  //   }
  // }, [dispatch, urlCardsPackId, question, answer]);


  // const addNewCard = () => {
  //   if (urlCardsPackId) {
  //     dispatch(createNewCardTC({cardsPack_id: urlCardsPackId}))
  //   }
  // };

  const changeCurrentPage = (page: number) => {
    dispatch(changeCardsCurrentPageAC(page));
    urlCardsPackId && dispatch(getCardsTC(urlCardsPackId))
  };
  // const debounceQuestionHandler = (text: string) => {
  //   dispatch(setCardsQuestionValue(text))
  // };
  // const debounceAnswerHandler = (text: string) => {
  //   dispatch(setCardsAnswerValue(text))
  // };
  //
  // const goBackHandler = () => {
  //   navigate(PATH.PACKS_LIST)
  // }
  return (
    <div className={s.container}>
      <div className={s.components}>
        <div className={s.packSide}>
          <CardsHeader/>
          <CardsContainer/>
        </div>
        <PaginationNew
          totalCount={cards.cardsTotalCount}
          pageSize={cards.pageCount}
          currentPage={cards.page}
          onPageChange={changeCurrentPage}
          siblingCount={3}
        />
      </div>
    </div>
  )
}