import React, {ChangeEvent, useEffect, useState} from 'react'
import s from './packsList.module.css'
import {deletePacksTC, getCardPackTC, postPacksTC, updatePacksTC} from '../../../m2-bll/cardPacksReducer';
import {useTypedDispatch, useTypedSelector} from '../../../m2-bll/store';
import {changePacksCurrentPageAC} from '../../../m2-bll/appReducer';
import {PacksContainer} from './p1-packs/PackContainer/PacksContainer';
import {PaginationNew} from '../../common/c11-Pagination/PaginationNew';
import {PackSettings} from './p1-packs/PackSettings/PackSettings';
import {PackHeader} from './p1-packs/PackHeader/PackHeader';
import ServerErrors from '../../common/c0-ErrorsBlock/ServerErrors';
import Preloader from '../../common/c7-Preloader/Preloader';
import SuperInputText from "../../common/c1-SuperInputText/SuperInputText";
import SuperButton from "../../common/c2-SuperButton/SuperButton";
import {Modal} from "../../common/c15-Modal/Modal";
import {CreatePackDataType, UpdateCardsPackType} from "../../../m3-dal/cardPacks-api";
import {useNavigate} from "react-router-dom";


export const PacksList = () => {
  const pack = useTypedSelector(state => state.packs)
  const sortUserId = useTypedSelector(state => state.sort.user_id)
  const packNameValue = useTypedSelector(state => state.sort.packName)
  const requestPackMinValue = useTypedSelector(state => state.sort.packMinValue)
  const requestPackMaxValue = useTypedSelector(state => state.sort.packMaxValue)
  const status = useTypedSelector(state => state.app.status)
  const serverErrors = useTypedSelector(state => state.app.errors)
  const dispatch = useTypedDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getCardPackTC())
  }, [sortUserId, packNameValue, requestPackMinValue, requestPackMaxValue, dispatch])
// <>
  //   {
  //     status === 'loading'
  //       ? <Preloader/>
  //   }
  // </>

  const [packName, setPackName] = useState('')
  const [show, setShow] = useState(false)
  const [deletePack, setDeletePack] = useState(false)

  // const changeModelMode = () => {
  //   setShow(!show)
  //
  // }
  // const changeDeleteMode = () => {
  //   setDeletePack(!deletePack)
  // }

  // ____________________________↓ Add Packs Modal_________________________________

  const addPackHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPackName(e.currentTarget.value)
  }
  const createPackButtonHandler = (data: CreatePackDataType) => {
    setShow(!show)
    dispatch(changePacksCurrentPageAC(1))
    dispatch(postPacksTC(data))
  }
  const changeCurrentPackPage = (page: number) => {
    dispatch(changePacksCurrentPageAC(page))
    dispatch(getCardPackTC())
  }
  // const closeAddPackModalWindow = () => {
  //   setShow(false)
  // }

  // ____________________________↑ Add Packs Modal_________________________________

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
    <div className={s.container}>

      <Modal modalMode={show} changeModelMode={()=>setShow(false)}
             >
        <SuperInputText placeholder='Pack Name' onChange={addPackHandler} autoFocus/>
        <SuperButton
          value={packName}
          onClick={() => {createPackButtonHandler({cardsPack: {name: packName}})}}
          title={'SAVE'}
          className={s.searchButton}
          disabled={packName === ''}
        /><SuperButton
          onClick={()=>setShow(false)}
          title={'CANCEL'}
          className={s.searchButton}
        />
      </Modal>



      <Modal modalMode={deletePack} changeModelMode={()=>setShow(false)}>
       <span>Do you really want to delete {packName}? </span>
       <span>All cards will be excluded from this course.</span>
        <SuperButton
          // onClick={() => deleteHandler(id)}
          title={'Delete'}
          className={s.searchButton}
        />
        <SuperButton
          onClick={()=>setDeletePack(false)}
          title={'Cancel'}
          className={s.searchButton}
        />
      </Modal>



      <div className={s.components}>
        <PackHeader changeModelMode={()=>setShow(true)}/>
        {serverErrors && <ServerErrors errors={serverErrors}/>}
        <div className={s.wrapper}>
          <PackSettings minRangeValue={pack.minCardsCount} maxRangeValue={pack.maxCardsCount}
                        maxCardsCount={requestPackMaxValue} minCardsCount={requestPackMinValue}/>
          <PacksContainer
            deleteHandler={deleteHandler}
            updateHandler={updateHandler}
            openCardsListHandler={openCardsListHandler}
            changeDeleteMode={()=> setDeletePack(true)}
          />
        </div>
        <PaginationNew
          totalCount={pack.cardPacksTotalCount}
          pageSize={pack.pageCount}
          currentPage={pack.page}
          onPageChange={changeCurrentPackPage}
          siblingCount={3}
        />
      </div>
    </div>
  )
}