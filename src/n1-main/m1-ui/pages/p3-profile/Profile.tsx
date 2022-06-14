import React, {useEffect, useState} from 'react'
import s from './profilePage.module.css';
import SuperButton from '../../common/c2-SuperButton/SuperButton';
import noPhoto from '../../../../assets/img/noPhoto.png'
import {ProfileEdit} from './ProfileEdit';
import {NavLink, useNavigate} from 'react-router-dom';
import {PATH} from '../../routes/Routs';
import {useTypedDispatch, useTypedSelector} from '../../../m2-bll/store';
import {changePacksCurrentPageAC, logOutMeTC} from '../../../m2-bll/appReducer';
import {changeEditModeAC} from '../../../m2-bll/uiReducer';
import Preloader from '../../common/c7-Preloader/Preloader';
import {PackSettings} from '../p8-packsList/p1-packs/PackSettings/PackSettings';
import {PacksContainer} from '../p8-packsList/p1-packs/PackContainer/PacksContainer';
import {PaginationNew} from '../../common/c11-Pagination/PaginationNew';
import {AddPackModal} from '../p8-packsList/p1-packs/PackModals/AddPackModal/AddPackModal';
import {useModalHandler} from '../../../utils/use-modal-handler';
import {getCardPackTC} from '../../../m2-bll/cardPacksReducer';
import {PackHeader} from '../p8-packsList/p1-packs/PackHeader/PackHeader';
import ServerErrors from '../../common/c0-ErrorsBlock/ServerErrors';
import {SuperDoubleRange} from '../../common/c9-SuperDoubleRange/SuperDoubleRange';
import {setMyAllFilterAC, setRangeValueAC} from '../../../m2-bll/sortReducer';

export const Profile = () => {

    const isAuthorised = useTypedSelector<boolean>(state => state.app.isAuthorised)
    const userId = useTypedSelector(state => state.auth._id)
    const editMode = useTypedSelector(state => state.ui.editMode)
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

    const navigate = useNavigate()
    const dispatch = useTypedDispatch()

    useEffect(() => {
        if (!isAuthorised) {
            navigate(PATH.LOGIN)
        }
    }, [isAuthorised, navigate])

    useEffect(() => {
        dispatch(getCardPackTC())
    }, [sortUserId, dispatch])

    useEffect(() => {
        setValue1(pack.minCardsCount)
        setValue2(pack.maxCardsCount)
    }, [pack.minCardsCount, pack.maxCardsCount])

    const [value1, setValue1] = useState(requestPackMinValue)
    const [value2, setValue2] = useState(requestPackMaxValue)

    const changeMode = () => {
        dispatch(changeEditModeAC(!editMode))
    }
    const logOutHandler = () => {
        dispatch(logOutMeTC())
    }
    const onMouseUpSetFilter = () => {
        dispatch(setRangeValueAC(value1, value2))
    }

    const changeCurrentPackPage = (page: number) => {
        dispatch(changePacksCurrentPageAC(page))
        dispatch(getCardPackTC())
    }

    const showAllPacksHandler = () => {
        dispatch(setMyAllFilterAC(''))
        dispatch(changePacksCurrentPageAC(1));
        //dispatch(setRangeValueAC(minCardsCount, maxCardsCount))
    }

    return (
        <div className={s.profileContainer}>
            {editMode ?
                <div className={s.components}>
                    {status === 'loading' ? <Preloader/> :
                        <>
                            <NavLink to={PATH.PACKS_LIST} className={navData => navData.isActive ? s.active : s.link}>
                                <div className={s.close} onClick={showAllPacksHandler}></div>
                            </NavLink>
                            <AddPackModal
                                closeModal={toggle_in_creation_modal}
                                modalMode={in_creation_modal}
                            />
                            <PackHeader closeModal={toggle_in_creation_modal}/>
                            {serverErrors && <ServerErrors errors={serverErrors}/>}
                            <div className={s.wrapper}>
                                <div className={s.leftSide}>
                                    <div className={s.avatar}>
                                        <div className={s.avatarBorder}>
                                            <img src={avatar || avatarMe || noPhoto} alt={'ava'}/>
                                        </div>
                                        <h2 className={s.profileName}>{name || nameMe || 'Name'}</h2>
                                    </div>
                                    <SuperButton className={s.editButton} title={'Edit Profile'} onClick={changeMode}/>
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
                                    <span className={s.link} onClick={logOutHandler}>Log Out</span>
                                </div>
                                <PacksContainer/>
                            </div>
                            <PaginationNew
                                totalCount={pack.cardPacksTotalCount}
                                pageSize={pack.pageCount}
                                currentPage={pack.page}
                                onPageChange={changeCurrentPackPage}
                                siblingCount={3}
                            />
                        </>
                    }
                </div>
                : <ProfileEdit changeMode={changeMode}/>
            }
        </div>
    )
}




