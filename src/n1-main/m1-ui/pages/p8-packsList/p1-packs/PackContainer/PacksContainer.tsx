import React, {useEffect, useState} from 'react';
import s from './packsContainer.module.css'
import {PackItem} from '../PackItem/PackItem';
import {setUpdatedFilterAC} from '../../../../../m2-bll/sortReducer';
import {getCardPackTC} from '../../../../../m2-bll/cardPacksReducer';
import {useTypedDispatch, useTypedSelector} from '../../../../../m2-bll/store';
import sortUp from '../../../../../../assets/img/sortUp.svg'
import sortDown from '../../../../../../assets/img/sortDown.svg'
import {changePacksCurrentPageAC} from "../../../../../m2-bll/appReducer";
import {DeletePackModal} from '../PackModals/DeletePackModal/DeletePackModal';
import {EditPackModal} from '../PackModals/EditPackModal/EditPackModal';
import {useNavigate} from "react-router-dom";
import {PATH} from "../../../../routes/Routs";

export const PacksContainer = () => {
  const pack = useTypedSelector(state => state.packs)
  const sortPacks = useTypedSelector(state => state.sort.sortPacks)
  const userId = useTypedSelector(state => state.auth._id)
  const dispatch = useTypedDispatch()
  const [openEditModalId,  setOpenEditModalId] = useState('')
  const [openDeleteModalId,  setOpenDeleteModalId] = useState('')

  const isAuthorised = useTypedSelector(state => state.app.isAuthorised)
  const navigate = useNavigate()
  useEffect(()=>{
    if (!isAuthorised) {
    navigate(PATH.LOGIN)
    }
  }, [isAuthorised, navigate])

  const closeEditModalHandler =()=>{
    setOpenEditModalId('')
  }
  const openEditModalHandler =(id: string)=>{
    setOpenEditModalId(id)
  }

  const closeDeleteModalHandler =()=>{
    setOpenDeleteModalId('')
  }
  const openDeleteModalHandler =(id: string)=>{
    setOpenDeleteModalId(id)
  }

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
        <DeletePackModal
            closeModal={closeDeleteModalHandler}
            modalMode={!!openDeleteModalId}
            packId={openDeleteModalId}
        />
        <EditPackModal
            closeModal={closeEditModalHandler}
            modalMode={!!openEditModalId}
            packId={openEditModalId}
        />
        <table>
          <thead>
          <tr className={s.packListHeader}>
            <th
              className={s.nameTitle}
              onClick={() => sortUpdatedHandler('name')}
            >Name <div
              className={s.sortUp}>{sortPacks === `0name`
              ? <img src={sortUp} alt="sortUp"/>
              : <img src={sortDown} alt="sortDown"/>}
            </div>
            </th>
            <th className={s.cardsTitle} onClick={() => sortUpdatedHandler('cardsCount')}>Cards <div
              className={s.sortUp}>{sortPacks === `0cardsCount`
              ? <img src={sortUp} alt="sortUp"/>
              : <img src={sortDown} alt="sortDown"/>}
            </div>
            </th>
            <th className={s.updateTitle} onClick={() => sortUpdatedHandler('updated')}
            >Last Updated <div
              className={s.sortUp}>{sortPacks === `0updated`
              ? <img src={sortUp} alt="sortUp"/>
              : <img src={sortDown} alt="sortDown"/>}
            </div>
            </th>
            <th className={s.creatorTitle}
                onClick={() => sortUpdatedHandler('user_name')}>Created by <div
              className={s.sortUp}>{sortPacks === `0user_name`
              ? <img src={sortUp} alt="sortUp"/>
              : <img src={sortDown} alt="sortDown"/>}
            </div>
            </th>
            <th className={s.actionsTitle}>Actions</th>
          </tr>
          </thead>
            <tbody className={s.packListBody}>
            {pack.cardPacks.map(p =>
              <PackItem
                  openEditModalHandler={openEditModalHandler}
                  openDeleteModalHandler={openDeleteModalHandler}
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
