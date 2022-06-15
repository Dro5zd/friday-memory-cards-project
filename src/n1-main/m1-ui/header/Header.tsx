import React from 'react';
import s from './Header.module.css'
import {NavLink} from 'react-router-dom';
import {PATH} from '../routes/Routs';
import {useTypedSelector} from '../../m2-bll/store';
import mainLogo from '../../../assets/img/B.A.D._logo3.png'
import {HeaderModal} from "./HeaderModal/HeaderModal";
import {useModalHandler} from "../../utils/use-modal-handler";

export const Header = () => {

  const isAuthorised = useTypedSelector<boolean>(state => state.app.isAuthorised)
  const {modal: header_modal, toggleModal: toggle_header_modal} = useModalHandler()

  return (
    <header className={s.header}>
      <HeaderModal
        closeModal={toggle_header_modal}
        modalMode={header_modal}
      />
      <NavLink to={isAuthorised ? PATH.PACKS_LIST : PATH.LOGIN}
               className={navData => navData.isActive ? s.active : s.link}>
        <div className={s.logo}>
          <img src={mainLogo} alt="main_logo"/>
        </div>
      </NavLink>
      {isAuthorised ?
        <div className={s.wrapper}>
          <div className={s.headerItem}>
            <button className={s.avatar} onClick={toggle_header_modal}></button>
          </div>
        </div>
        :
        ''
      }
    </header>
  );
}