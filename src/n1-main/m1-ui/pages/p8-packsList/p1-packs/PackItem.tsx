import React, {useEffect} from 'react';
import s from './packItem.module.css';
import {useTypedDispatch, useTypedSelector} from "../../../../m2-bll/store";
import {deletePacksTC, getCardPackTC, updatePacksTC} from "../../../../m2-bll/cardPacksReducer";
import SuperButton from "../../../common/c2-SuperButton/SuperButton";
import {useNavigate} from "react-router-dom";
import {PacksDataType, UpdateCardsPackType} from "../../../../m3-dal/cardPacks-api";

export const PackItem = () => {
  const navigate = useNavigate()
  const pack = useTypedSelector(state => state.packs.cardPacks)
  const userId = useTypedSelector(state => state.auth._id)

  const dispatch = useTypedDispatch()
  const initValue = {} as PacksDataType

  useEffect(() => {
    dispatch(getCardPackTC(initValue))
  }, [dispatch])

  const deleteHandler = (id: string) => {
    dispatch(deletePacksTC(id))
  }

  const updateHandler = (data: UpdateCardsPackType) => {
    dispatch(updatePacksTC(data))
  }

  const openCardsListHandler = (packId: string) => {
    navigate('/cards-list/' + packId)
  }

  return (
    <div>
      {
        pack.map((pack) => {
            return (
              <div key={pack.created} className={s.packItemContainer}>
                <div onClick={() => openCardsListHandler(pack._id)} className={s.nameColumn}><span>{pack.name}</span>
                </div>
                <div className={s.cardsColumn}><span>{pack.cardsCount}</span></div>
                <div className={s.updateColumn}><span>{pack.created}</span></div>
                <div className={s.userNameColumn}>{pack.user_name}</div>
                <div className={s.actionsColumn}>
                  <div className={s.buttonBlock}>
                    <SuperButton title={'Learn'} className={s.packLearnButton}/>
                    {userId === pack.user_id &&
                        <SuperButton onClick={() => updateHandler({cardsPack: {_id: pack._id, name: '🇺🇦🇺🇦🇺🇦🇺🇦'}})}
                                     title={'Edit'} className={s.packEditButton}/>}
                    {userId === pack.user_id && <SuperButton onClick={() => deleteHandler(pack._id)} title={'Delete'}
                                                             className={s.packDeleteButton}/>}
                  </div>
                </div>
              </div>
            )
          }
        )
      }
    </div>
  );
};

// спросить по поводу инпута, по поводу апдейт, по поводу отрисовки кнопок если юзак трушный