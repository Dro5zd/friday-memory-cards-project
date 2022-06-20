import React, {useEffect} from 'react'
import s from './packsList.module.css'
import {getCardPackTC} from '../../../m2-bll/cardPacksReducer';
import {useTypedDispatch, useTypedSelector} from '../../../m2-bll/store';
import {changePacksCurrentPageAC, setPacksPortionAC} from '../../../m2-bll/appReducer';
import {PacksContainer} from './p1-packs/PackContainer/PacksContainer';
import {Pagination} from '../../common/c11-Pagination/Pagination';
import {PackSettings} from './p1-packs/PackSettings/PackSettings';
import {PackHeader} from './p1-packs/PackHeader/PackHeader';
import ServerErrors from '../../common/c0-ErrorsBlock/ServerErrors';
import Preloader from '../../common/c7-Preloader/Preloader';
import {useModalHandler} from '../../../utils/use-modal-handler';
import {AddPackModal} from './p1-packs/PackModals/AddPackModal/AddPackModal';


export const PacksList = () => {
  const pack = useTypedSelector(state => state.packs)
  const sortUserId = useTypedSelector(state => state.sort.user_id)
  const packNameValue = useTypedSelector(state => state.sort.packName)
  const requestPackMinValue = useTypedSelector(state => state.sort.packMinValue)
  const requestPackMaxValue = useTypedSelector(state => state.sort.packMaxValue)
  const status = useTypedSelector(state => state.app.status)
  const serverErrors = useTypedSelector(state => state.app.errors)
  const selectedPage = useTypedSelector(state => state.app.packsCurrentPage)

  const {modal: in_creation_modal, toggleModal: toggle_in_creation_modal} = useModalHandler()
  const dispatch = useTypedDispatch()

  useEffect(() => {
    dispatch(getCardPackTC())
  }, [sortUserId, packNameValue, requestPackMinValue, requestPackMaxValue, dispatch, selectedPage])


  const changeCurrentPackPage = (page: number) => {
    dispatch(changePacksCurrentPageAC(page))
  }

  const onChangeOption = (option: number) => {
    dispatch(setPacksPortionAC(option))
    dispatch(getCardPackTC())
  }

  return (
    <div className={s.container}>
      <AddPackModal
        closeModal={toggle_in_creation_modal}
        modalMode={in_creation_modal}
      />
      <div className={s.components}>
        <PackHeader closeModal={toggle_in_creation_modal}/>
        <div className={s.wrapper}>
          <PackSettings
            minRangeValue={pack.minCardsCount}
            maxRangeValue={pack.maxCardsCount}
            maxCardsCount={requestPackMaxValue}
            minCardsCount={requestPackMinValue}
          />
          {
            status === 'loading'
              ? <div className={s.preloader}><Preloader/></div>
              : <PacksContainer/>
          }
        </div>
        <Pagination
          totalCount={pack.cardPacksTotalCount}
          pageSize={pack.pageCount}
          currentPage={pack.page}
          onPageChange={changeCurrentPackPage}
          siblingCount={3}
          onChangePortions={onChangeOption}
          title={'packs'}
        />
      </div>
      <div className={s.eWrapper}>
        {serverErrors && <ServerErrors errors={serverErrors}/>}
      </div>
    </div>
  )
}