import React from 'react';
import s from './Header.module.css'
import {NavLink} from 'react-router-dom';
import {PATH} from '../routes/Routs';
import {useTypedSelector} from '../../m2-bll/store';
import mainLogo from '../../../assets/img/B.A.D._logo3.png'
import noPhoto from '../../../assets/img/noPhoto.png';
import Switcher from '../common/c8-Switcher/Switcher';

export const Header = () => {
  const name = useTypedSelector(state => state.profile.name)
  const nameMe = useTypedSelector(state => state.auth.name)
  const avatar = useTypedSelector(state => state.profile.avatar)
  const avatarMe = useTypedSelector(state => state.auth.avatar)
  const isAuthorised = useTypedSelector<boolean>(state => state.app.isAuthorised)

  return (
    <div className={s.header}>
       <NavLink to={isAuthorised ? PATH.PACKS_LIST : PATH.LOGIN} className={navData => navData.isActive ? s.active : s.link}>
        <div className={s.logo}>
          <img src={mainLogo} alt="main_logo"/>
        </div>
      </NavLink>
      {isAuthorised ?
        <div className={s.wrapper}>

          {/*<div className={s.headerItem}>*/}
          {/*    <NavLink to={PATH.PACKS_LIST} className={navData => navData.isActive ? s.active : s.link}>*/}
          {/*        Packs List*/}
          {/*    </NavLink>*/}
          {/*</div>*/}

          <div className={s.headerItem}>
            <NavLink to={PATH.PROFILE} className={navData => navData.isActive ? s.active : s.link}>
              <div className={s.avatar}>
                <h2 className={s.profileName}>{name || nameMe || 'Name'}</h2>
                <div className={s.avatarBorder}>
                  <img src={avatar || avatarMe || noPhoto} alt={'ava'}/>
                </div>
              </div>
            </NavLink>
            {/*<NavLink to={PATH.PROFILE} className={navData => navData.isActive ? s.active : s.link}>*/}
            {/*    Profile*/}
            {/*</NavLink>*/}
          </div>
        </div>
        :
       ''
      }
      {/*   <NavLink to={PATH.LOGIN} className={navData => navData.isActive ? s.active : s.link}>
           Login
         </NavLink>*/}
      {/*<NavLink to={PATH.REGISTER} className={navData => navData.isActive ? s.active : s.link}>*/}
      {/*    Register*/}
      {/*</NavLink>*/}
      {/*<NavLink to={PATH.PASSWORD_RECOVERY} className={navData => navData.isActive ? s.active : s.link}>*/}
      {/*    Password Recovery*/}
      {/*</NavLink>*/}
      {/*<NavLink to={PATH.ENTERING_NEW_PASSWORD} className={navData => navData.isActive ? s.active : s.link}>*/}
      {/*    New Password*/}
      {/*</NavLink>*/}
      {/*<NavLink to={PATH.TEST} className={navData => navData.isActive ? s.active : s.link}>*/}
      {/*    PacksList*/}
      {/*</NavLink>*/}
    </div>
  );
}

