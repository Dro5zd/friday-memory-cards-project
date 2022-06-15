import React from 'react';
import s from './Header.module.css'
import {NavLink} from 'react-router-dom';
import {PATH} from '../routes/Routs';
import {useTypedDispatch, useTypedSelector} from '../../m2-bll/store';
import mainLogo from '../../../assets/img/B.A.D._logo3.png'
import noPhoto from '../../../assets/img/noPhoto.png';
import {Switcher} from '../common/c8-Switcher/Switcher';
import {changeThemeAC} from '../../m2-bll/uiReducer';
import {setMyAllFilterAC} from '../../m2-bll/sortReducer';
import {changePacksCurrentPageAC} from '../../m2-bll/appReducer';

export const Header = () => {

    const name = useTypedSelector(state => state.profile.name)
    const nameMe = useTypedSelector(state => state.auth.name)
    const userId = useTypedSelector(state => state.auth._id)
    const avatar = useTypedSelector(state => state.profile.avatar)
    const avatarMe = useTypedSelector(state => state.auth.avatar)
    const isAuthorised = useTypedSelector<boolean>(state => state.app.isAuthorised)
    const mode = useTypedSelector(state => state.ui.mode)

    const dispatch = useTypedDispatch()

    const onChangeThemeHandler = () => {
        return dispatch(changeThemeAC(!mode))
    }

    const showMyPacksHandler = () => {
        dispatch(setMyAllFilterAC(userId))
        dispatch(changePacksCurrentPageAC(1));
    }


    return (
        <header className={s.header}>
            <NavLink to={isAuthorised ? PATH.PACKS_LIST : PATH.LOGIN}
                     className={navData => navData.isActive ? s.active : s.link}>
                <div className={s.logo} >
                    <img src={mainLogo} alt="main_logo"/>
                </div>
            </NavLink>
            <Switcher onChangeThemeHandler={onChangeThemeHandler}/>
            {isAuthorised ?
                <div className={s.wrapper}>
                    <div className={s.headerItem}>
                        <NavLink to={PATH.PROFILE} className={navData => navData.isActive ? s.active : s.link} onClick={showMyPacksHandler}>
                            <div className={s.avatar} >
                                <h2 className={s.profileName}>{name || nameMe || 'Name'}</h2>
                                <div className={s.avatarBorder}>
                                    <img src={avatar || avatarMe || noPhoto} alt={'ava'}/>
                                </div>
                            </div>
                        </NavLink>


                    </div>

                </div>
                :
                ''
            }
        </header>
    );
}

