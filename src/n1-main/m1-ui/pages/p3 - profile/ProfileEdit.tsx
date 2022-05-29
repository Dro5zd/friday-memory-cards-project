import React, {ChangeEvent, useState} from 'react'
import s from './profilePage.module.css';
import SuperButton from '../../common/c2-SuperButton/SuperButton';
import noPhoto from '../../../../assets/img/noPhoto.png'
import SuperInputText from '../../common/c1-SuperInputText/SuperInputText';
import {profileAPI} from '../../../m3-dal/profile-api';
import {useSelector} from 'react-redux';
import {AppStoreType} from '../../../m2-bll/store';

type ProfileEditType = {
    changeMode: (mode: boolean) => void
}



export const ProfileEdit = (props: ProfileEditType) => {

    const [newName, setNewName] = useState('')
    const [newAvatar, setNewAvatar] = useState('')

    const onChangeNewNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewName(e.currentTarget.value)
    }
    const onChangeNewAvatarHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewAvatar(e.currentTarget.value)
    }
    const onBlurHandler = () => {
        profileAPI.changeProfile({name: newName, avatar: newAvatar}).then()
    }

    const avatar = useSelector<AppStoreType, string | undefined>(state => state.auth.avatar)

    return (
        <div className={s.profileContainer}>
            <div className={s.components}>

                <div className={s.avatar}>
                    <h2 className={s.profileName}>Personal Information</h2>
                    <img src={avatar || noPhoto} alt={'ava'}/>
                </div>

                <div className={s.inputBlock}>
                    <SuperInputText placeholder={'Enter new name'} onChange={onChangeNewNameHandler} onBlur={onBlurHandler}/>
                    <SuperInputText placeholder={'Enter link to new avatar'} onChange={onChangeNewAvatarHandler} onBlur={onBlurHandler}/>
                </div>

                <div className={s.buttonBlock}>
                    <SuperButton className={s.cancelButton} title={'Cancel'} onClick={() => props.changeMode(true)}/>
                    <SuperButton title={'Save'} onClick={() => props.changeMode(true)}/>
                </div>
            </div>
        </div>
    )
}

