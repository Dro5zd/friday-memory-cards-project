import React from 'react';
import s from './Header.module.css'
import {NavLink} from 'react-router-dom';
import {PATH} from '../routes/Routs';
import {useTypedSelector} from '../../m2-bll/store';
import mainLogo from '../../../assets/img/B.A.D._logo3.png'
// @ts-ignore
// import user from '../../../assets/img/user.svg'

export const Header = () => {

  const isAuthorised = useTypedSelector<boolean>(state => state.app.isAuthorised)

  return (
    <div className={s.header}>
      <div className={s.logo}>
          <img src={mainLogo} alt="main_logo"/>
        {/*<span>B.A.D. Memory cards</span>*/}
      </div>

      {isAuthorised ?
        <div className={s.wrapper}>

            <div className={s.headerItem}>
              <NavLink to={PATH.PACKS_LIST} className={navData => navData.isActive ? s.active : s.link}>
                Packs List
              </NavLink>
            </div>

            <div className={s.headerItem}>

              <NavLink to={PATH.PROFILE} className={navData => navData.isActive ? s.active : s.link}>
                {/*<img className={s.user} src={user} alt="user"/>*/}
                Profile
              </NavLink>
            </div>

        </div>

        :
        ''
        // <span>login</span>
          //
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

