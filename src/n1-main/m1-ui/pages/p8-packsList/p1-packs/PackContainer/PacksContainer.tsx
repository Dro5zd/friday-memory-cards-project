import React from 'react';
import s from './packsContainer.module.css'
import {PackItem} from '../PackItem/PackItem';
import {setUpdatedFilterAC} from '../../../../../m2-bll/sortReducer';
import {getCardPackTC} from '../../../../../m2-bll/cardPacksReducer';
import {useTypedDispatch, useTypedSelector} from '../../../../../m2-bll/store';
import sortUpBlack from '../../../../../../assets/img/sortUpBlack.png'
import sortDownBlack from '../../../../../../assets/img/sortDownBlack.png'
import sortUpWhite from '../../../../../../assets/img/sortUpWhite.png'
import sortDownWhite from '../../../../../../assets/img/sortDownWhite.png'
import {changePacksCurrentPageAC} from "../../../../../m2-bll/appReducer";
import {SortArrows} from "../../../../common/SortArrows/SortArrows";

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
            > Name<SortArrows/>
            </th>
            <th className={s.cardsTitle} onClick={() => sortUpdatedHandler('cardsCount')}>Cards <SortArrows/>
            </th>
            <th className={s.updateTitle} onClick={() => sortUpdatedHandler('updated')}
            >Last Updated <SortArrows/>
            </th>
            <th className={s.creatorTitle}
                onClick={() => sortUpdatedHandler('user_name')}>Created by <SortArrows/>
            </th>
            <th className={s.actionsTitle}>Actions</th>
          </tr>
          </thead>
          <div className={s.packListBody}>
            <tbody>
            {pack.cardPacks.map(p =>
              <PackItem userId={userId} pack={p} key={p._id}/>)}
            </tbody>
          </div>
        </table>
      </div>
    </div>
  );
};