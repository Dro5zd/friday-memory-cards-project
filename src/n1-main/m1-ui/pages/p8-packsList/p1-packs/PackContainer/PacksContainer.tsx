import React from 'react';
import s from './packsContainer.module.css'
import {PackItem} from '../PackItem/PackItem';
import {setUpdatedFilterAC} from '../../../../../m2-bll/sortReducer';
import {getCardPackTC} from '../../../../../m2-bll/cardPacksReducer';
import {useTypedDispatch, useTypedSelector} from '../../../../../m2-bll/store';
import sortUpBlack from '../../../../../../assets/img/sortUpBlack.png'
import sortDownBlack from '../../../../../../assets/img/sortDownBlack.png'
import {changePacksCurrentPageAC} from "../../../../../m2-bll/appReducer";

export const PacksContainer = () => {
  const pack = useTypedSelector(state => state.packs)
  const sortPacks = useTypedSelector(state => state.sort.sortPacks)
  const userId = useTypedSelector(state => state.auth._id)
  const dispatch = useTypedDispatch()

  const sortUpdatedHandler = (value: string) => {
    sortPacks === `0${value}` ?
      dispatch(setUpdatedFilterAC(`1${value}`)) :
      dispatch(setUpdatedFilterAC(`0${value}`))
    dispatch(changePacksCurrentPageAC(1));
    dispatch(getCardPackTC())
  }

  return (
    <div className={s.packsSide}>
      <div className={s.packsContainer}>
        <table>
          <thead>
          <tr className={s.packListHeader}>
            <th
              className={s.nameTitle}
              onClick={() => sortUpdatedHandler('name')}
            >Name <div
              className={s.sortUp}>{sortPacks === `0name`
              ? <img src={sortUpBlack} alt="sortUpWhite"/>
              : <img src={sortDownBlack} alt="sortDownBlack"/>}
            </div>
            </th>
            <th className={s.cardsTitle} onClick={() => sortUpdatedHandler('cardsCount')}>Cards <div
              className={s.sortUp}>{sortPacks === `0cardsCount`
              ? <img src={sortUpBlack} alt="sortUpWhite"/>
              : <img src={sortDownBlack} alt="sortDownBlack"/>}
            </div>
            </th>
            <th className={s.updateTitle} onClick={() => sortUpdatedHandler('updated')}
            >Last Updated <div
              className={s.sortUp}>{sortPacks === `0updated`
              ? <img src={sortUpBlack} alt="sortUpWhite"/>
              : <img src={sortDownBlack} alt="sortDownBlack"/>}
            </div>
            </th>
            <th className={s.creatorTitle}
                onClick={() => sortUpdatedHandler('user_name')}>Created by <div
              className={s.sortUp}>{sortPacks === `0user_name`
              ? <img src={sortUpBlack} alt="sortUpWhite"/>
              : <img src={sortDownBlack} alt="sortDownBlack"/>}
            </div>
            </th>
            <th className={s.actionsTitle}>Actions</th>
          </tr>
          </thead>
            <tbody className={s.packListBody}>
            {pack.cardPacks.map(p =>
              <PackItem
                        userId={userId}
                        pack={p}
                        key={p._id}
              />)}
            </tbody>
        </table>
      </div>
    </div>
  );
};
