import React, {useEffect} from 'react'
import s from './profilePage.module.css';
import SuperButton from '../../common/c2-SuperButton/SuperButton';
import noPhoto from '../../../../assets/img/noPhoto.png'
import {ProfileEdit} from './ProfileEdit';
import {NavLink, useNavigate} from 'react-router-dom';
import {PATH} from '../../routes/Routs';
import {useTypedDispatch, useTypedSelector} from '../../../m2-bll/store';
import {logOutMeTC} from '../../../m2-bll/appReducer';
import {changeEditModeAC} from "../../../m2-bll/uiReducer";
import Preloader from "../../common/c7-Preloader/Preloader";

export const Profile = () => {

  const isAuthorised = useTypedSelector<boolean>(state => state.app.isAuthorised)
  const editMode = useTypedSelector(state => state.ui.editMode)
  const name = useTypedSelector(state => state.profile.name)
  const nameMe = useTypedSelector(state => state.auth.name)
  const avatar = useTypedSelector(state => state.profile.avatar)
  const avatarMe = useTypedSelector(state => state.auth.avatar)
  const status = useTypedSelector(state => state.app.status)

  const navigate = useNavigate()
  const dispatch = useTypedDispatch()


  useEffect(() => {
    if (!isAuthorised) {
      navigate(PATH.LOGIN)
    }
  }, [isAuthorised, navigate])

  const changeMode = () => {
    dispatch(changeEditModeAC(!editMode))
  }
  const logOutHandler = () => {
    dispatch(logOutMeTC())
  }

  return (
    <div className={s.profileContainer}>
      {
        editMode
          ? <div className={s.components}>
            {
              status === 'loading'
                ? <Preloader/>
                : <>
                  <NavLink to={PATH.PACKS_LIST} className={navData => navData.isActive ? s.active : s.link}>
                    <div className={s.close}></div>
                  </NavLink>
                  <div className={s.avatar}>
                    <div className={s.avatarBorder}>
                      <img src={avatar || avatarMe || noPhoto} alt={'ava'}/>
                    </div>
                    <h2 className={s.profileName}>{name || nameMe || 'Name'}</h2>
                  </div>
                  <SuperButton className={s.editButton} title={'Edit LearningPage'} onClick={changeMode}/>

                  <span className={s.link} onClick={logOutHandler}>Log Out</span>
                </>
            }
          </div>
          : <ProfileEdit changeMode={changeMode}/>
      }
    </div>
  )
}




