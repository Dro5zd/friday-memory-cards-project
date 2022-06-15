import React from 'react';
import {setMyAllFilterAC} from "../../../m2-bll/sortReducer";
import {changePacksCurrentPageAC, logOutMeTC} from "../../../m2-bll/appReducer";
import {NavLink} from "react-router-dom";
import {useTypedDispatch, useTypedSelector} from "../../../m2-bll/store";
import {PATH} from "../../routes/Routs";
import noPhoto from '../../../../assets/img/noPhoto.png';
import s from './HeaderModal.module.css'
import {ModalHeaderEdited} from "./ModalEditedForHeader/ModalHeaderEdited";
import logOut from "../../../../assets/img/arrow-right-from-bracket-solid.svg";
import {Switcher} from "../../common/c8-Switcher/Switcher";
import {changeThemeAC} from "../../../m2-bll/uiReducer";


interface IHeaderModal {
  closeModal: () => void;
  modalMode: boolean;
}

export const HeaderModal: React.FC<IHeaderModal> = ({
                                                      closeModal,
                                                      modalMode
                                                    }) => {
  const name = useTypedSelector(state => state.profile.name)
  const nameMe = useTypedSelector(state => state.auth.name)
  const userId = useTypedSelector(state => state.auth._id)
  const avatar = useTypedSelector(state => state.profile.avatar)
  const avatarMe = useTypedSelector(state => state.auth.avatar)
  const mode = useTypedSelector(state => state.ui.mode)
  const dispatch = useTypedDispatch();

  const showMyPacksHandler = () => {
    dispatch(setMyAllFilterAC(userId))
    dispatch(changePacksCurrentPageAC(1));
    closeModal()
  }
  const logOutHandler = () => {
    dispatch(logOutMeTC())
  }

  const onChangeThemeHandler = () => {
    return dispatch(changeThemeAC(!mode))
  }


  return (
    <ModalHeaderEdited modalMode={modalMode} closeModal={closeModal}>
      <div className={s.wrapper}>
        <NavLink
          to={PATH.PROFILE}
          className={navData => navData.isActive ? s.active : s.link}
          onClick={showMyPacksHandler}
        >
          <div className={s.avatar}>
            <div className={s.avatarBorder}>
              <img className={s.imgAvatar} src={avatar || avatarMe || noPhoto} alt={'ava'}/>
            </div>
            <h2 className={s.profileName}>{name || nameMe || 'Name'}</h2>
          </div>
        </NavLink>
        <Switcher onChangeThemeHandler={onChangeThemeHandler}/>
        <div className={s.logOut} onClick={logOutHandler}>
          <img src={logOut} alt="logOut"/>
        </div>
      </div>
    </ModalHeaderEdited>
  );
};