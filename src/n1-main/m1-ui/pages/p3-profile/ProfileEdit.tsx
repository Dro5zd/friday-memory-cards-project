import React, {ChangeEvent, useState} from 'react'
import s from './profileEditPage.module.css';
import SuperButton from '../../common/c2-SuperButton/SuperButton';
import noPhoto from '../../../../assets/img/noPhoto.png'
import SuperInputText from '../../common/c1-SuperInputText/SuperInputText';
import {useTypedDispatch, useTypedSelector} from '../../../m2-bll/store';
import {updateProfileTC} from '../../../m2-bll/profileReducer';
import Preloader from "../../common/c7-Preloader/Preloader";
import {PATH} from "../../routes/Routs";
import {useNavigate} from "react-router-dom";
import {EditPhotoIcon} from './EditPhotoIcon';

export const ProfileEdit = () => {

  const avatar = useTypedSelector(state => state.profile.avatar)
  const name = useTypedSelector(state => state.profile.name)
  const authName = useTypedSelector(state => state.auth.name)
  const status = useTypedSelector(state => state.app.status)
  const navigate = useNavigate()
  const dispatch = useTypedDispatch()

  const [newName, setNewName] = useState(name || authName || '')
  const [newAvatar, setNewAvatar] = useState(avatar)

  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// надо пофиксить вылеты при повторном изменении фотки
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  const onChangeNewNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewName(e.currentTarget.value)
  }

  const cancelButtonHandler = () => {
    navigate(PATH.PROFILE)
  }

  const updateProfile = async () => {
    await dispatch(updateProfileTC({name: newName, avatar: newAvatar}))
    navigate(PATH.PROFILE)
  }

  return (
    <div className={s.profileEditContainer}>
      <div className={s.components}>
        {
          status === 'loading'
            ? <Preloader/>
            : <>
              <div className={s.avatar}>
                <h2 className={s.profileName}>Personal Information</h2>
                <div className={s.avatarBorder}>
                  <img src={newAvatar || noPhoto} alt={'ava'}/>
                </div>
              </div>

              <div className={s.inputBlock}>
                <SuperInputText placeholder={'Enter new name'} onChange={onChangeNewNameHandler} value={newName}/>
              </div>

              <div className={s.buttonBlock}>
                <SuperButton title={'Save'} onClick={() => updateProfile()}/>
                <EditPhotoIcon className={s.editPhoto} dispatchCallback={setNewAvatar}/>
                <SuperButton className={s.cancelButton} title={'Cancel'} onClick={cancelButtonHandler}/>
              </div>
            </>
        }
      </div>
    </div>
  )
}