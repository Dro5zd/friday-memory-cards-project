import React, {useEffect} from 'react';
import s from './packItem.module.css';
import {useTypedDispatch, useTypedSelector} from "../../../../m2-bll/store";
import {getCardPackTC, deletePacksTC, updatePacksTC} from "../../../../m2-bll/cardPacksReducer";
import SuperButton from "../../../common/c2-SuperButton/SuperButton";
import {useNavigate} from "react-router-dom";
import {PATH} from "../../../routes/Routs";

export const PackItem = () => {
const navigate = useNavigate()
  const pack = useTypedSelector(state => state.packs.cardPacks)
  const dispatch = useTypedDispatch()

  useEffect(() => {
    dispatch(getCardPackTC())
  }, [dispatch])

  const deleteHandler = (id: string) => {
    dispatch(deletePacksTC(id))
  }

const updateHandler = (id: string, name: string) => {
    dispatch(updatePacksTC(id, name))
}

const openCardsListHandler = (packId: string) => {
  navigate( '/cards-list/' + packId)
}

  return (
    <div>
      {
        pack.map((pack) => {
            return (
              <div key={pack.created} className={s.packItemContainer}>
                <div onClick={() => openCardsListHandler(pack._id)} className={s.nameColumn}><span>{pack.name}</span></div>
                <div className={s.cardsColumn}><span>{pack.cardsCount}</span></div>
                <div className={s.updateColumn}><span>{pack.created}</span></div>
                <div className={s.nameColumn}>{pack.user_name}</div>
                <div className={s.actionsColumn}>
                  <SuperButton onClick={() => deleteHandler(pack._id)} title={'Delete'} className={s.myBtn}/>
                  <SuperButton onClick={() => updateHandler(pack._id, pack.name)} title={'Edit'} className={s.myBtn}/>
                  <SuperButton title={'Learn'} className={s.myBtn}/>
                </div>
              </div>
            )
          }
        )
      }

    </div>
  );
};