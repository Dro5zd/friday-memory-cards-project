import React, {useEffect, useState} from 'react'
import s from './profilePage.module.css';
import noPhoto from '../../../../assets/img/noPhoto.png'
import {useNavigate} from 'react-router-dom';
import {PATH} from '../../routes/Routs';
import {useTypedDispatch, useTypedSelector} from '../../../m2-bll/store';
import {changePacksCurrentPageAC, setPacksPortionAC} from '../../../m2-bll/appReducer';
import Preloader from '../../common/c7-Preloader/Preloader';
import {PacksContainer} from '../p8-packsList/p1-packs/PackContainer/PacksContainer';
import {Pagination} from '../../common/c11-Pagination/Pagination';
import {AddPackModal} from '../p8-packsList/p1-packs/PackModals/AddPackModal/AddPackModal';
import {useModalHandler} from '../../../utils/use-modal-handler';
import {getCardPackTC} from '../../../m2-bll/cardPacksReducer';
import {PackHeader} from '../p8-packsList/p1-packs/PackHeader/PackHeader';
import ServerErrors from '../../common/c0-ErrorsBlock/ServerErrors';
import {SuperDoubleRange} from '../../common/c9-SuperDoubleRange/SuperDoubleRange';
import {setRangeValueAC} from '../../../m2-bll/sortReducer';
import {EditPhotoIcon} from "./EditPhotoIcon";
import {updateProfileTC} from "../../../m2-bll/profileReducer";

export const Profile = () => {

  const isAuthorised = useTypedSelector<boolean>(state => state.app.isAuthorised)
  const name = useTypedSelector(state => state.profile.name)
  const nameMe = useTypedSelector(state => state.auth.name)
  const avatar = useTypedSelector(state => state.profile.avatar)
  const avatarMe = useTypedSelector(state => state.auth.avatar)
  const status = useTypedSelector(state => state.app.status)
  const pack = useTypedSelector(state => state.packs)
  const sortUserId = useTypedSelector(state => state.sort.user_id)
  const serverErrors = useTypedSelector(state => state.app.errors)
  const requestPackMinValue = useTypedSelector(state => state.sort.packMinValue)
  const requestPackMaxValue = useTypedSelector(state => state.sort.packMaxValue)
  const {modal: in_creation_modal, toggleModal: toggle_in_creation_modal} = useModalHandler()

  const [newAvatar, setNewAvatar] = useState(avatar || avatarMe)

  const navigate = useNavigate()
  const dispatch = useTypedDispatch()

  useEffect(() => {
    if (!isAuthorised) {
      navigate(PATH.LOGIN)
    }
  }, [isAuthorised, navigate])

  useEffect(() => {
    dispatch(getCardPackTC())
  }, [sortUserId, dispatch, requestPackMinValue, requestPackMaxValue])

  useEffect(() => {
    setValue1(pack.minCardsCount)
    setValue2(pack.maxCardsCount)
  }, [pack.minCardsCount, pack.maxCardsCount])

  const [value1, setValue1] = useState(requestPackMinValue)
  const [value2, setValue2] = useState(requestPackMaxValue)

  const onMouseUpSetFilter = () => {
    dispatch(setRangeValueAC(value1, value2))
  }

  const changeCurrentPackPage = (page: number) => {
    dispatch(changePacksCurrentPageAC(page))
    dispatch(getCardPackTC())
  }

  const onChangeOption = (option: number) => {
    dispatch(setPacksPortionAC(option))
    dispatch(getCardPackTC())
  }

  const updateProfile = async (avatar: string) => {
    setNewAvatar(avatar)
    await dispatch(updateProfileTC({avatar}))
  }

  return (
    <div className={s.profileContainer}>
        <div className={s.components}>
          {status === 'loading' ? <Preloader/> :
            <>
              <AddPackModal
                closeModal={toggle_in_creation_modal}
                modalMode={in_creation_modal}
              />
              <PackHeader closeModal={toggle_in_creation_modal}/>
              <div className={s.wrapper}>
                <div className={s.leftSide}>
                  <div className={s.avatar}>
                    <div className={s.avatarBorder}>
                      <img src={newAvatar || noPhoto} alt={'ava'}/>
                    </div>
                    <h2 className={s.profileName}>{name || nameMe || 'Name'}</h2>
                  </div>
                  <EditPhotoIcon className={s.editPhoto} dispatchCallback={updateProfile}/>
                  <div className={s.rangeWrapper}>
                    <div className={s.rangeSpan}>
                      <span>Number of Cards</span>
                    </div>
                    <div className={s.range}>
                      <SuperDoubleRange
                        onMouseUpSetFilter={onMouseUpSetFilter}
                        value={[value1, value2]}
                        setValue1={setValue1}
                        setValue2={setValue2}
                        min={pack.minCardsCount}
                        max={pack.maxCardsCount}
                      />
                    </div>
                  </div>
                </div>
                <PacksContainer/>
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
            </>
          }
        </div>
      <div className={s.eWrapper}>
        {serverErrors && <ServerErrors errors={serverErrors}/>}
      </div>
    </div>
  )
}