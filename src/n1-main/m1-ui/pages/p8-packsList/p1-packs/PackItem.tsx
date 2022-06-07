import React, {useEffect} from 'react';
import s from './packItem.module.css';
import {useTypedDispatch, useTypedSelector} from "../../../../m2-bll/store";
import {deletePacksTC, getCardPackTC, updatePacksTC} from "../../../../m2-bll/cardPacksReducer";
import {useNavigate} from "react-router-dom";
import {UpdateCardsPackType} from "../../../../m3-dal/cardPacks-api";
import trash from '../../../../../assets/img/trash.png'
import trashWhite from '../../../../../assets/img/trashWhite.png'
import edit from '../../../../../assets/img/sliders.png'
import editWhite from '../../../../../assets/img/slidersWhite.png'
import learn from '../../../../../assets/img/bookOpen.png'
import learnWhite from '../../../../../assets/img/bookOpenWhite.png'

export const PackItem = () => {
  const navigate = useNavigate()
  const pack = useTypedSelector(state => state.packs.cardPacks)
  const userId = useTypedSelector(state => state.auth._id)
  const dispatch = useTypedDispatch()
  const mode = useTypedSelector(state => state.ui.mode)

  useEffect(() => {
    dispatch(getCardPackTC())
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
                    <div className={s.learnWrapper}>
                      <img  className={s.packLearnIcon} src={mode ? learn : learnWhite} alt="learn"/>
                    </div>
                    {userId === pack.user_id &&
                        <div className={s.editeWrapper} onClick={() => updateHandler({cardsPack: {_id: pack._id, name: '🇺🇦🇺🇦🇺🇦🇺🇦'}})}>
                            <img className={s.packEditIcon} src={mode ? edit : editWhite} alt="edit"/>
                        </div>
                    }
                    {userId === pack.user_id &&
                        <div className={s.deleteWrapper} onClick={() => deleteHandler(pack._id)}>
                            <img className={s.packDeleteIcon} src={mode ? trash : trashWhite} alt="delete"/>
                        </div>
                    }
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