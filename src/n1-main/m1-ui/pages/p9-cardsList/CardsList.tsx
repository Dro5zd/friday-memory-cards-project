import React, {useEffect} from 'react'
import s from './cardsList.module.css'
import {useTypedDispatch, useTypedSelector} from "../../../m2-bll/store";
import {getCardsTC} from '../../../m2-bll/cardsReducer';
import {useNavigate, useParams} from "react-router-dom";
import {changeCardsCurrentPageAC, setCardsPortionAC} from '../../../m2-bll/appReducer';
import {CardsContainer} from './c1-cards/CardsContainer/CardsContainer';
import ServerErrors from "../../common/c0-ErrorsBlock/ServerErrors";
import {Pagination} from "../../common/c11-Pagination/Pagination";
import {CardsHeader} from "./c1-cards/CardsHeader/CardsHeader";
import Preloader from "../../common/c7-Preloader/Preloader";
import {AddCardModal} from "./c1-cards/CardsModals/AddCardModal/AddCardModal";
import {useModalHandler} from "../../../utils/use-modal-handler";
import {PATH} from "../../routes/Routs";

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
    const cardsPortionValue = useTypedSelector(state => state.app.cardsPortionValue);
    const isOwner = userId === packUserId;
    const {modal: in_creation_modal, toggleModal: toggle_in_creation_modal} = useModalHandler()


    useEffect(() => {
        if (urlCardsPackId) {
            dispatch(getCardsTC(urlCardsPackId))
        }
    }, [dispatch, urlCardsPackId, question, answer, cardsPortionValue]);

    const isAuthorised = useTypedSelector(state => state.app.isAuthorised)
    const navigate = useNavigate()
    useEffect(()=>{
       if (!isAuthorised) {
            navigate(PATH.LOGIN)
        }
    }, [isAuthorised, navigate])

    const changeCurrentPage = (page: number) => {
        dispatch(changeCardsCurrentPageAC(page));
        urlCardsPackId && dispatch(getCardsTC(urlCardsPackId))
    }

    const onChangeOption = (option: number) => {
        dispatch(setCardsPortionAC(option))
    }

  return (
    <div className={s.container}>
      <div className={s.components}>
        <div className={s.packSide}>
          {urlCardsPackId &&
              <AddCardModal
                  closeModal={toggle_in_creation_modal}
                  modalMode={in_creation_modal}
                  packId={urlCardsPackId}
              />
          }
          <CardsHeader addNewCard={toggle_in_creation_modal} isOwner={isOwner}/>

          {
            status === 'loading'
              ? <Preloader/>
              : <CardsContainer/>
          }
        </div>
        <Pagination
          totalCount={cards.cardsTotalCount}
          pageSize={cards.pageCount}
          currentPage={cards.page}
          onPageChange={changeCurrentPage}
          siblingCount={3}
          onChangePortions={onChangeOption}
          title={'cards'}
        />
      </div>
      <div className={s.eWrapper}>
        {serverErrors && <ServerErrors errors={serverErrors}/>}
      </div>
    </div>
  )
}