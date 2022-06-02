import React, {ChangeEvent, useState} from 'react'
import s from './profileEditPage.module.css';
import SuperButton from '../../common/c2-SuperButton/SuperButton';
import noPhoto from '../../../../assets/img/noPhoto.png'
import SuperInputText from '../../common/c1-SuperInputText/SuperInputText';
import {useTypedDispatch, useTypedSelector} from '../../../m2-bll/store';
import {updateProfileTC} from '../../../m2-bll/profileReducer';

type ProfileEditType = {
    changeMode: (mode: boolean) => void
}

export const ProfileEdit = (props: ProfileEditType) => {

    const avatar = useTypedSelector(state => state.profile.avatar)
    const name = useTypedSelector(state => state.profile.name)
    const authName = useTypedSelector(state => state.auth.name)
    const authAvatar = useTypedSelector(state => state.auth.avatar)

    const dispatch = useTypedDispatch()

    const [newName, setNewName] = useState(name || authName || '')
    const [newAvatar, setNewAvatar] = useState(avatar || authAvatar || '')

    const onChangeNewNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewName(e.currentTarget.value)
    }
    const onChangeNewAvatarHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewAvatar(e.currentTarget.value)
    }

    const cancelButtonHandler = ()=>{
        props.changeMode(true)
    }

    const updateProfile = (name: string, avatar: string) => {
        dispatch(updateProfileTC({name, avatar}))
        props.changeMode(true)
    }

    return (
        <div className={s.profileEditContainer}>
            <div className={s.components}>
                <div className={s.avatar}>
                    <h2 className={s.profileName}>Personal Information</h2>
                    <div className={s.avatarBorder}>
                        <img src={ avatar || authAvatar || noPhoto} alt={'ava'}/>
                    </div>
                </div>

                <div className={s.inputBlock}>
                    <SuperInputText placeholder={'Enter new name'} onChange={onChangeNewNameHandler} value={newName}/>
                    <SuperInputText placeholder={'Enter link to new avatar'} onChange={onChangeNewAvatarHandler} value={newAvatar}/>
                </div>

                <div className={s.buttonBlock}>
                    <SuperButton className={s.cancelButton} title={'Cancel'} onClick={cancelButtonHandler}/>
                    <SuperButton title={'Save'} onClick={()=>updateProfile(newName, newAvatar)}/>
                </div>
            </div>
        </div>
    )
}
